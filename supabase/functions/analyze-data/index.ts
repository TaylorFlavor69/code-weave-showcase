
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const executePythonScript = async (scriptContent: string, data: any[], query: string) => {
  // Create a temporary Python script file
  const pythonScript = `
import json
import pandas as pd
import numpy as np
from io import StringIO
import sys

# Read data from stdin
data_json = '''${JSON.stringify(data)}'''
query = '''${query}'''

try:
    # Load data into pandas DataFrame
    data = json.loads(data_json)
    df = pd.DataFrame(data)
    
    # User's custom script will be inserted here
    ${scriptContent}
    
    # If no result is defined, provide basic info
    if 'result' not in locals():
        result = {
            'summary': f"Dataset has {len(df)} rows and {len(df.columns)} columns",
            'columns': list(df.columns),
            'data_types': df.dtypes.to_dict(),
            'sample': df.head().to_dict('records') if not df.empty else []
        }
    
    print(json.dumps(result))
    
except Exception as e:
    error_result = {
        'error': str(e),
        'traceback': str(e)
    }
    print(json.dumps(error_result))
`

  try {
    // Write the Python script to a temporary file
    const tempFile = `/tmp/analysis_${Date.now()}.py`
    await Deno.writeTextFile(tempFile, pythonScript)

    // Execute the Python script
    const command = new Deno.Command('python3', {
      args: [tempFile],
      stdout: 'piped',
      stderr: 'piped',
    })

    const { code, stdout, stderr } = await command.output()
    
    // Clean up the temporary file
    try {
      await Deno.remove(tempFile)
    } catch (e) {
      console.warn('Could not remove temp file:', e)
    }

    if (code !== 0) {
      const errorText = new TextDecoder().decode(stderr)
      throw new Error(`Python execution failed: ${errorText}`)
    }

    const outputText = new TextDecoder().decode(stdout)
    return JSON.parse(outputText.trim())

  } catch (error) {
    console.error('Python execution error:', error)
    throw error
  }
}

const getDefaultPythonScript = (dataset: string, query: string) => {
  const baseScript = `
# Default analysis script
# You can customize this based on your needs

# Basic data exploration
print(f"Dataset shape: {df.shape}")
print(f"Columns: {list(df.columns)}")

result = {
    'analysis': f"Analysis for query: {query}",
    'shape': df.shape,
    'columns': list(df.columns),
    'summary_stats': df.describe().to_dict() if not df.empty else {},
    'sample_data': df.head(5).to_dict('records') if not df.empty else [],
    'insights': []
}

# Add specific analysis based on query
query_lower = query.lower()

if 'correlation' in query_lower:
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 1:
        corr_matrix = df[numeric_cols].corr()
        result['correlation'] = corr_matrix.to_dict()
        result['insights'].append("Correlation analysis completed")

if 'average' in query_lower or 'mean' in query_lower:
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if not numeric_cols.empty:
        averages = df[numeric_cols].mean()
        result['averages'] = averages.to_dict()
        result['insights'].append("Average calculations completed")

if 'count' in query_lower or 'distribution' in query_lower:
    for col in df.columns:
        if df[col].dtype == 'object':
            value_counts = df[col].value_counts().head(10)
            result[f'{col}_distribution'] = value_counts.to_dict()
    result['insights'].append("Distribution analysis completed")

# Dataset-specific analysis
`

  if (dataset === 'pokemon') {
    return baseScript + `
if 'legendary' in query_lower:
    if 'Legendary' in df.columns:
        legendary_stats = df[df['Legendary'] == True]
        result['legendary_count'] = len(legendary_stats)
        result['insights'].append(f"Found {len(legendary_stats)} legendary Pokemon")

if 'strongest' in query_lower or 'highest' in query_lower:
    if 'Attack' in df.columns:
        strongest = df.loc[df['Attack'].idxmax()]
        result['strongest_pokemon'] = strongest.to_dict()
        result['insights'].append("Found strongest Pokemon by Attack stat")
`
  } else if (dataset === 'CustomerExperience') {
    return baseScript + `
if 'satisfaction' in query_lower:
    if 'Satisfaction_Score' in df.columns:
        avg_satisfaction = df['Satisfaction_Score'].mean()
        result['average_satisfaction'] = avg_satisfaction
        result['insights'].append(f"Average satisfaction score: {avg_satisfaction:.2f}")

if 'retention' in query_lower:
    if 'Retention_Status' in df.columns:
        retention_dist = df['Retention_Status'].value_counts()
        result['retention_distribution'] = retention_dist.to_dict()
        result['insights'].append("Retention status distribution analyzed")
`
  } else if (dataset === 'SuccessEducationBackground') {
    return baseScript + `
if 'degree' in query_lower:
    if 'Degree' in df.columns:
        degree_dist = df['Degree'].value_counts()
        result['degree_distribution'] = degree_dist.to_dict()
        result['insights'].append("Degree distribution analyzed")

if 'university' in query_lower or 'institution' in query_lower:
    if 'Institution' in df.columns:
        top_institutions = df['Institution'].value_counts().head(10)
        result['top_institutions'] = top_institutions.to_dict()
        result['insights'].append("Top institutions identified")
`
  }

  return baseScript
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found in environment variables')
    }

    const { query, dataset, userId, usePython = true, pythonScript } = await req.json()

    // Check query limit
    const { data: queryData, error: countError } = await supabaseClient
      .from('user_queries')
      .select('count')
      .eq('user_id', userId)
      .maybeSingle()

    const currentCount = queryData?.count || 0
    
    if (currentCount >= 5) {
      return new Response(
        JSON.stringify({ error: 'Daily query limit reached' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Fetch data based on dataset selection
    let data
    let dataDescription = ''
    
    if (dataset === 'pokemon') {
      const { data: pokemonData, error: pokemonError } = await supabaseClient
        .from('PokemonData')
        .select('*, Pokemon_BattleTable(*)')
      
      if (pokemonError) throw pokemonError
      data = pokemonData
      dataDescription = 'Pokémon dataset with stats including HP, Attack, Defense, types, and battle data'
    } else if (dataset === 'CustomerExperience') {
      const { data: customerData, error: customerError } = await supabaseClient
        .from('CustomerExperience')
        .select('*')
      
      if (customerError) throw customerError
      data = customerData
      dataDescription = 'Customer Experience dataset with satisfaction scores, demographics, and retention data'
    } else if (dataset === 'SuccessEducationBackground') {
      const { data: educationData, error: educationError } = await supabaseClient
        .from('SuccessEducationBackground')
        .select('*')
      
      if (educationError) throw educationError
      data = educationData
      dataDescription = 'Education and Success dataset with degree information, institutions, and career outcomes'
    } else {
      throw new Error('Invalid dataset selected')
    }

    let result

    if (usePython) {
      // Use Python for analysis
      try {
        const scriptToUse = pythonScript || getDefaultPythonScript(dataset, query)
        const pythonResult = await executePythonScript(scriptToUse, data, query)
        
        // Format Python result for the frontend
        result = {
          text: `Python Analysis Results:\n\n${pythonResult.analysis || 'Analysis completed'}\n\nInsights:\n${(pythonResult.insights || []).join('\n')}`,
          table: pythonResult.sample_data || data.slice(0, 10),
          visualization: {
            type: 'table',
            data: pythonResult.sample_data || data.slice(0, 10)
          },
          pythonResult: pythonResult
        }
      } catch (pythonError) {
        console.error('Python execution failed, falling back to OpenAI:', pythonError)
        // Fall back to OpenAI if Python fails
        usePython = false
      }
    }

    if (!usePython) {
      // Use OpenAI as fallback or if explicitly requested
      const dataContext = `
Dataset: ${dataset}
Description: ${dataDescription}
Total records: ${data.length}
Sample data structure: ${JSON.stringify(data.slice(0, 2), null, 2)}

Available columns: ${Object.keys(data[0] || {}).join(', ')}

You are acting as PandasAI, a conversational data analysis assistant. Analyze this dataset and provide:
1. Direct answers to the user's question
2. Relevant data insights and patterns
3. Statistical summaries when appropriate
4. Suggested follow-up questions

User query: ${query}
`
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are PandasAI, a conversational data analysis assistant. You help users understand their data through natural language conversations. 

Key capabilities:
- Analyze patterns and trends in datasets
- Perform statistical analysis
- Answer specific questions about data
- Suggest visualizations and insights
- Provide clear, actionable conclusions

Always structure your responses with:
1. Direct answer to the question
2. Supporting data analysis
3. Key insights or patterns found
4. Suggested next steps or questions

Be conversational, insightful, and data-driven in your responses.`
            },
            {
              role: 'user',
              content: dataContext
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('OpenAI API error:', errorText)
        throw new Error(`OpenAI API request failed: ${response.status}`)
      }

      const aiResponse = await response.json()
      const analysisText = aiResponse.choices[0].message.content

      // Filter data based on the query for more relevant table display
      let relevantData = data.slice(0, 10) // Default to first 10 rows
      
      // Simple filtering logic - could be enhanced
      if (query.toLowerCase().includes('legendary') && dataset === 'pokemon') {
        relevantData = data.filter((row: any) => row.Legendary === true).slice(0, 10)
      } else if (query.toLowerCase().includes('satisfied') && dataset === 'CustomerExperience') {
        relevantData = data.filter((row: any) => row.Satisfaction_Score >= 8).slice(0, 10)
      } else if (query.toLowerCase().includes('phd') && dataset === 'SuccessEducationBackground') {
        relevantData = data.filter((row: any) => row.Degree?.toLowerCase().includes('phd')).slice(0, 10)
      }

      // Create a comprehensive analysis result
      result = {
        text: analysisText,
        table: relevantData,
        visualization: {
          type: 'table',
          data: relevantData
        }
      }
    }

    // Update query count
    await supabaseClient
      .from('user_queries')
      .upsert({ 
        user_id: userId, 
        count: currentCount + 1,
        last_query: new Date().toISOString()
      })

    console.log('Analysis completed successfully for user:', userId, 'using:', usePython ? 'Python' : 'OpenAI')
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Analysis error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
