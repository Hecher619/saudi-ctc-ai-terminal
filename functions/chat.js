import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 1. Monitor: Start the clock for latency tracking
  const startTime = Date.now();

  // Handle CORS Pre-flight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    // 2. Security: Ensure the API key is present in environment
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are the CITC Regulatory Engine v1.0. Analyze: ${text}` }] }]
      })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    // 3. Monitor: Log Success and Latency
    const duration = Date.now() - startTime;
    console.log(`[MONITOR] SUCCESS | Latency: ${duration}ms`);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // 4. Monitor: Log Failure
    const duration = Date.now() - startTime;
    console.error(`[MONITOR] ERROR | Latency: ${duration}ms | Reason: ${error.message}`);

    return new Response(JSON.stringify({ error: "System Latency or Processing Error", details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

