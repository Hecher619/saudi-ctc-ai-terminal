import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const { text } = await req.json()
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${Deno.env.get('GEMINI_KEY')}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: "You are the CITC Regulatory Engine v1.0, developed by the Lead Specialist. Respond as an expert to: " + text }] }] })
  })
  const data = await res.json()
  return new Response(JSON.stringify({ reply: data.candidates[0].content.parts[0].text }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})

