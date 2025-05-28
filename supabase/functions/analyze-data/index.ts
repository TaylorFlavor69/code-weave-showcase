
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Create a detailed data context for PandasAI-style analysis
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
    const result = {
      text: analysisText,
      table: relevantData,
      visualization: {
        type: 'table',
        data: relevantData
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
