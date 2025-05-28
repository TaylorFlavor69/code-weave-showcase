import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'
import { PandasAI } from 'https://esm.sh/pandas-ai@1.5.0'
import * as pandas from 'https://esm.sh/pandas-js@0.2.4'

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
    const openaiApiKey = Deno.env.get('OpenAiKey')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found in environment variables')
    }

    const configuration = new Configuration({
      apiKey: openaiApiKey,
    })
    const openai = new OpenAIApi(configuration)

    const { query, dataset, userId } = await req.json()

    // Check query limit
    const { data: queryCount, error: countError } = await supabaseClient
      .from('user_queries')
      .select('count')
      .eq('user_id', userId)
      .single()

    if (countError) throw countError
    if (queryCount.count >= 5) {
      return new Response(
        JSON.stringify({ error: 'Daily query limit reached' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

    // Convert to pandas DataFrame
    const df = pandas.DataFrame(data)

    // Initialize PandasAI
    const pandasAI = new PandasAI(openai)

    // Process query
    const result = await pandasAI.run(df, query)

    // Update query count
    await supabaseClient
      .from('user_queries')
      .upsert({ 
        user_id: userId, 
        count: queryCount.count + 1,
        last_query: new Date().toISOString()
      })

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}) 