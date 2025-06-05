
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

    // Get OpenAI key from Supabase secrets using the correct name
    const openai_key = Deno.env.get("OpenAiKey")
    if (!openai_key) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const renderUrl = "https://data-viz-agent-yubh.onrender.com"

    const res = await fetch(renderUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supabase_url: Deno.env.get("SUPABASE_URL"),
        supabase_key: Deno.env.get("SUPABASE_ANON_KEY"),
        openai_key,
        question,
      }),
    })

    if (!res.ok) {
      throw new Error(`External service error: ${res.status}`)
    }

    const result = await res.json()

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
