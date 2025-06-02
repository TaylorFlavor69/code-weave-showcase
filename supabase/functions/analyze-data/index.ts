
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const executePandasAI = async (data: any[], query: string, openaiApiKey: string) => {
  // Create a Python script that uses PandasAI for conversational data analysis
  const pythonScript = `
import json
import pandas as pd
import os
from pandasai import SmartDataframe
from pandasai.llm import OpenAI
import sys
import plotly.graph_objects as go
import plotly.express as px

# Set up OpenAI API key
os.environ['OPENAI_API_KEY'] = '${openaiApiKey}'

try:
    # Read data from stdin
    data_json = '''${JSON.stringify(data)}'''
    query = '''${query}'''
    
    # Load data into pandas DataFrame
    data = json.loads(data_json)
    df = pd.DataFrame(data)
    
    # Initialize PandasAI SmartDataframe with OpenAI
    llm = OpenAI(api_token='${openaiApiKey}')
    smart_df = SmartDataframe(
        df,
        config={
            "llm": llm,
            "custom_chart_engine": "plotly",
            "save_charts": True,
            "verbose": True
        }
    )
    
    # Use PandasAI to answer the query conversationally
    response = smart_df.chat(query)
    
    # Format the response
    result = {
        'analysis': str(response),
        'data_shape': df.shape,
        'columns': list(df.columns),
        'sample_data': df.head(5).to_dict('records') if not df.empty else []
    }
    
    print(json.dumps(result))
    
except Exception as e:
    error_result = {
        'error': f"PandasAI execution failed: {str(e)}",
        'fallback_analysis': f"Could not analyze: {query}. Dataset has {len(df) if 'df' in locals() else 0} rows."
    }
    print(json.dumps(error_result))
`

  try {
    // Write the Python script to a temporary file
    const tempFile = `/tmp/pandasai_${Date.now()}.py`
    await Deno.writeTextFile(tempFile, pythonScript)

    // Execute the Python script (assuming pandasai is installed)
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
      throw new Error(`PandasAI execution failed: ${errorText}`)
    }

    const outputText = new TextDecoder().decode(stdout)
    return JSON.parse(outputText.trim())

  } catch (error) {
    console.error('PandasAI execution error:', error)
    // Return a fallback response if PandasAI fails
    return {
      error: error.message,
      fallback_analysis: `Analysis failed for query: "${query}". Please try a simpler question.`,
      data_shape: data.length > 0 ? [data.length, Object.keys(data[0]).length] : [0, 0],
      sample_data: data.slice(0, 5)
    }
  }
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

    const { query, dataset, userId } = await req.json()

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

    // Fetch data based on dataset selection with enhanced Pokemon data handling
    let data
    let dataDescription = ''
    
    if (dataset === 'pokemon') {
      // Fetch both Pokemon and Battle tables
      const [pokemonResponse, battleResponse] = await Promise.all([
        supabaseClient.from('PokemonData').select('*'),
        supabaseClient.from('Pokemon_BattleTable').select('*')
      ])

      if (pokemonResponse.error) throw pokemonResponse.error
      if (battleResponse.error) throw battleResponse.error

      const pokemonData = pokemonResponse.data || []
      const battleData = battleResponse.data || []

      // Enhanced merge logic similar to your Python script
      let mergedData = []
      
      for (const battle of battleData) {
        const firstPokemon = pokemonData.find(p => p['#'] === battle.First_pokemon)
        const secondPokemon = pokemonData.find(p => p['#'] === battle.Second_pokemon)
        const winner = pokemonData.find(p => p['#'] === battle.Winner)
        
        const mergedRow = {
          // Battle info
          ...battle,
          
          // First Pokemon info (with suffix)
          ...(firstPokemon ? Object.fromEntries(
            Object.entries(firstPokemon).map(([key, value]) => 
              key === '#' ? [key + '_Pokemon1', value] : [key + '_Pokemon1', value]
            )
          ) : {}),
          
          // Second Pokemon info (with suffix)
          ...(secondPokemon ? Object.fromEntries(
            Object.entries(secondPokemon).map(([key, value]) => 
              key === '#' ? [key + '_Pokemon2', value] : [key + '_Pokemon2', value]
            )
          ) : {}),
          
          // Winner Pokemon info (with suffix)
          ...(winner ? Object.fromEntries(
            Object.entries(winner).map(([key, value]) => 
              key === '#' ? [key + '_Winner', value] : [key + '_Winner', value]
            )
          ) : {})
        }
        
        mergedData.push(mergedRow)
      }

      // If no battles found, use Pokemon data alone
      if (mergedData.length === 0) {
        data = pokemonData
        dataDescription = 'Pokémon dataset with stats including HP, Attack, Defense, types, and abilities'
      } else {
        data = mergedData
        dataDescription = 'Enhanced Pokémon dataset with battle data, including First/Second Pokemon stats and Winner information'
      }
      
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

    try {
      // Try to use PandasAI for conversational analysis
      const pandasResult = await executePandasAI(data, query, openaiApiKey)
      
      if (pandasResult.error) {
        // If PandasAI fails, fall back to OpenAI directly
        console.log('PandasAI failed, falling back to OpenAI:', pandasResult.error)
        throw new Error('PandasAI failed')
      }
      
      // Format PandasAI result for the frontend
      result = {
        text: `PandasAI Analysis:\n\n${pandasResult.analysis}\n\nDataset: ${dataDescription}`,
        table: pandasResult.sample_data || data.slice(0, 10),
        visualization: {
          type: 'table',
          data: pandasResult.sample_data || data.slice(0, 10)
        },
        pythonResult: pandasResult
      }
    } catch (pandasError) {
      console.error('PandasAI execution failed, falling back to OpenAI:', pandasError)
      
      // Enhanced fallback to OpenAI with better Pokemon analysis
      const dataContext = `
Dataset: ${dataset}
Description: ${dataDescription}
Total records: ${data.length}
Sample data structure: ${JSON.stringify(data.slice(0, 2), null, 2)}

Available columns: ${Object.keys(data[0] || {}).join(', ')}

Special Pokemon Dataset Features:
- Contains merged battle data with Pokemon stats
- Pokemon1, Pokemon2, and Winner information available
- Type combinations and battle effectiveness can be analyzed
- Stats include HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
- Legendary status and generation information available

You are acting as PandasAI, a conversational data analysis assistant. Analyze this dataset and provide:
1. Direct answers to the user's question
2. Relevant data insights and patterns
3. Statistical summaries when appropriate
4. Visualization suggestions for the data
5. Follow-up questions to explore the data further

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
              content: `You are PandasAI, a conversational data analysis assistant specialized in Pokemon battle analysis. You help users understand their data through natural language conversations with a focus on Pokemon stats, types, and battle effectiveness.

Key capabilities:
- Analyze Pokemon battle patterns and type effectiveness
- Perform statistical analysis on Pokemon stats
- Answer specific questions about Pokemon data and battles
- Suggest visualizations for Pokemon data
- Provide clear, actionable conclusions about Pokemon performance

Always structure your responses with:
1. Direct answer to the question
2. Supporting data analysis with specific Pokemon examples
3. Key insights or patterns found in the data
4. Suggested visualizations (charts, graphs, comparisons)
5. Follow-up questions to explore Pokemon data further

Be conversational, insightful, and Pokemon-focused in your responses.`
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

      // Enhanced filtering logic for Pokemon data
      let relevantData = data.slice(0, 10) // Default to first 10 rows
      
      if (dataset === 'pokemon') {
        if (query.toLowerCase().includes('legendary')) {
          relevantData = data.filter((row: any) => 
            row.Legendary === true || 
            row.Legendary_Pokemon1 === true || 
            row.Legendary_Pokemon2 === true || 
            row.Legendary_Winner === true
          ).slice(0, 10)
        } else if (query.toLowerCase().includes('charizard')) {
          relevantData = data.filter((row: any) => 
            row.Name?.toLowerCase().includes('charizard') ||
            row.Name_Pokemon1?.toLowerCase().includes('charizard') ||
            row.Name_Pokemon2?.toLowerCase().includes('charizard') ||
            row.Name_Winner?.toLowerCase().includes('charizard')
          ).slice(0, 10)
        } else if (query.toLowerCase().includes('fire') || query.toLowerCase().includes('type')) {
          relevantData = data.filter((row: any) => 
            row['Type 1']?.toLowerCase().includes('fire') ||
            row['Type 2']?.toLowerCase().includes('fire') ||
            row['Type 1_Pokemon1']?.toLowerCase().includes('fire') ||
            row['Type 1_Pokemon2']?.toLowerCase().includes('fire')
          ).slice(0, 10)
        }
      } else if (query.toLowerCase().includes('satisfied') && dataset === 'CustomerExperience') {
        relevantData = data.filter((row: any) => row.Satisfaction_Score >= 8).slice(0, 10)
      } else if (query.toLowerCase().includes('phd') && dataset === 'SuccessEducationBackground') {
        relevantData = data.filter((row: any) => row.Degree?.toLowerCase().includes('phd')).slice(0, 10)
      }

      result = {
        text: `${analysisText}\n\n(Note: Using OpenAI analysis as PandasAI environment is not available)`,
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

    console.log('Analysis completed successfully for user:', userId)
    
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
