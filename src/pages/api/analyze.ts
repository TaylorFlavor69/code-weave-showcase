import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Configuration, OpenAIApi } from 'openai'
import { PandasAI } from 'pandas-ai'
import * as pandas from 'pandas-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Initialize OpenAI
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OpenAiKey,
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query, dataset, userId } = req.body

    // Check query limit
    const { data: queryCount, error: countError } = await supabase
      .from('user_queries')
      .select('count')
      .eq('user_id', userId)
      .single()

    if (countError) throw countError
    if (queryCount.count >= 5) {
      return res.status(429).json({ error: 'Daily query limit reached' })
    }

    // Fetch data based on dataset selection
    let data
    if (dataset === 'pokemon') {
      const { data: pokemonData, error: pokemonError } = await supabase
        .from('PokemonData')
        .select('*, Pokemon_BattleTable(*)')
      
      if (pokemonError) throw pokemonError
      data = pokemonData
    } else {
      const { data: tableData, error: tableError } = await supabase
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
    await supabase
      .from('user_queries')
      .upsert({ 
        user_id: userId, 
        count: queryCount.count + 1,
        last_query: new Date().toISOString()
      })

    return res.status(200).json(result)

  } catch (error: any) {
    console.error('Error:', error)
    return res.status(500).json({ error: error.message })
  }
} 