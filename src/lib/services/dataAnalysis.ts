import { supabase } from './supabase'

export interface AnalysisResult {
  text: string
  table?: any[]
  visualization?: {
    type: string
    data: any
  }
}

export const analyzeData = async (
  query: string,
  dataset: string
): Promise<AnalysisResult> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      dataset,
      userId: user.id,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to analyze data')
  }

  return response.json()
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
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No record found, user hasn't made any queries yet
      return 0
    }
    throw error
  }

  return data.count
} 