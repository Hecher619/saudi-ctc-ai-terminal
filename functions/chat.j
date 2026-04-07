import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  const startTime = Date.now();
  const traceId = crypto.randomUUID();

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { text } = await req.json();
    
    // 1. Defense: Input validation & sanitization
    if (!text || text.length > 2000) throw new Error("INVALID_PAYLOAD");
    const sanitized = text.replace(/[<>]/g, "");

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("AUTH_CONFIG_MISSING");

    // 2. Performance: 8-second circuit breaker
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: `System: CITC Regulatory Specialist. Analyze concisely: ${sanitized}` }] }]
      })
    });

    clearTimeout(timeout);
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No inference generated.";

    const duration = Date.now() - startTime;
    console.log(`[TRACE:${traceId}] SUCCESS | Latency: ${duration}ms`);

    return new Response(JSON.stringify({ 
      reply, 
      meta: { traceId, latency: `${duration}ms`, model: "gemini-1.5-flash" } 
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[TRACE:${traceId}] ERROR | ${error.message}`);

    return new Response(JSON.stringify({ 
      error: error.name === 'AbortError' ? "Gateway Timeout" : "Processing Error",
      traceId 
    }), { 
      status: error.name === 'AbortError' ? 504 : 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});

