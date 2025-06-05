
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()

    const { question } = body
    if (!question) {
      return new Response(
        JSON.stringify({ error: "Missing question" }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get credentials from Supabase secrets
    const openai_key = Deno.env.get("OpenAiKey")
    const supabase_url = Deno.env.get("SUPABASE_URL")
    const supabase_service_key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    
    console.log('Environment check:', {
      hasOpenAI: !!openai_key,
      hasSupabaseUrl: !!supabase_url,
      hasServiceKey: !!supabase_service_key,
      supabaseUrl: supabase_url
    })

    if (!openai_key) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!supabase_url || !supabase_service_key) {
      return new Response(
        JSON.stringify({ error: "Supabase credentials not configured" }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const renderUrl = "https://data-viz-agent-yubh.onrender.com/run-chat/"

    const requestPayload = {
      supabase_url,
      supabase_key: supabase_service_key, // Use service role key instead of anon key
      openai_key,
      question,
    }

    console.log('Sending request to external service:', {
      url: renderUrl,
      payload: {
        ...requestPayload,
        openai_key: '[REDACTED]',
        supabase_key: '[REDACTED]'
      }
    })

    const res = await fetch(renderUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload),
    })

    console.log('External service response status:', res.status)

    if (!res.ok) {
      const errorText = await res.text()
      console.error('External service error response:', errorText)
      throw new Error(`External service error: ${res.status}`)
    }

    const result = await res.json()
    console.log('External service success response received')

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (e) {
    console.error('PandasAI render error:', e)
    return new Response(
      JSON.stringify({ error: "Internal error", details: e.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
