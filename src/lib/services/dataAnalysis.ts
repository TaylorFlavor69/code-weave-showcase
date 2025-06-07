
import { supabase } from '@/integrations/supabase/client'

export interface AnalysisResult {
  text: string
  table?: any[]
  visualization?: {
    type: string
    data: any
  }
  pythonResult?: any
  chart?: string // Add chart field for base64 images
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

  // Handle the structured response from PandasAI
  const output = data.response || data.text || 'Analysis completed successfully.';
  
  const result: AnalysisResult = {
    text: output,
    table: data.table,
    visualization: data.visualization
  };

  // Add chart if available
  if (data.chart_base64) {
    result.chart = `data:image/png;base64,${data.chart_base64}`;
  }

  return result;
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
