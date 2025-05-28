
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    if (dataset === 'pokemon') {
      const { data: pokemonData, error: pokemonError } = await supabaseClient
        .from('PokemonData')
        .select('*, Pokemon_BattleTable(*)')
      
      if (pokemonError) throw pokemonError
      data = pokemonData
    } else {
      const { data: tableData, error: tableError } = await supabaseClient
        .from(dataset)
        .select('*')
      
      if (tableError) throw tableError
      data = tableData
    }

    // Use OpenAI to analyze the data instead of pandas
    const dataContext = `Dataset: ${dataset}\nData sample: ${JSON.stringify(data.slice(0, 5))}\nTotal records: ${data.length}`
    
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
            content: 'You are a data analyst. Analyze the provided dataset and answer user queries with insights, trends, and relevant data. Provide responses in a structured format with text explanations and suggested visualizations.'
          },
          {
            role: 'user',
            content: `${dataContext}\n\nUser query: ${query}\n\nPlease analyze this data and provide insights.`
          }
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API request failed')
    }

    const aiResponse = await response.json()
    const analysisText = aiResponse.choices[0].message.content

    // Create a basic analysis result
    const result = {
      text: analysisText,
      table: data.slice(0, 10), // Return first 10 rows as sample
      visualization: {
        type: 'table',
        data: data.slice(0, 10)
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
