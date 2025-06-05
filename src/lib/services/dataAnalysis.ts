
import { supabase } from '@/integrations/supabase/client'

export interface AnalysisResult {
  text: string
  table?: any[]
  visualization?: {
    type: string
    data: any
  }
  pythonResult?: any
}

export const analyzeData = async (
  query: string,
  dataset: string
): Promise<AnalysisResult> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const { data, error } = await supabase.functions.invoke('analyze-data', {
    body: {
      query,
      dataset,
      userId: user.id,
    },
  })

  if (error) {
    throw new Error(error.message || 'Failed to analyze data')
  }

  return data
}

export const analyzePokemonWithPandasAI = async (
  query: string
): Promise<AnalysisResult> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const { data, error } = await supabase.functions.invoke('pandasai-render', {
    body: {
      question: query,
    },
  })

  if (error) {
    throw new Error(error.message || 'Failed to analyze Pokemon data with PandasAI')
  }

  return data
}

export const getQueryCount = async (): Promise<number> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const { data, error } = await supabase
    .from('user_queries')
    .select('count')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data?.count || 0
}
