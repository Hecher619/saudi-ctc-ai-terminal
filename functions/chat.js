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
    import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  const startTime = Date.now();
  const traceId = crypto.randomUUID(); // Professional Trace ID for debugging

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    // Intention: Basic Sanitization to prevent prompt leakage
    const sanitizedText = text.replace(/[<>]/g, "").slice(0, 1000); 

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("INTERNAL_AUTH_ERROR");

    // Intention: Timeout Controller (Abort after 8 seconds)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: `[SYSTEM_AUTH_READY] Role: CITC Specialist. Context: Saudi Regulations. Task: Analyze the following input with high precision: ${sanitizedText}` }] }]
      })
    });

    clearTimeout(timeout);
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Inference Engine Timeout.";

    const duration = Date.now() - startTime;
    console.log(`[TRACE:${traceId}] SUCCESS | Latency: ${duration}ms`);

    return new Response(JSON.stringify({ 
      reply,
      meta: {
        traceId,
        latency: `${duration}ms`,
        model: "gemini-1.5-flash",
        timestamp: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[TRACE:${traceId}] ERROR | Latency: ${duration}ms | ${error.message}`);

    return new Response(JSON.stringify({ 
      error: "Gateway Timeout or Security Intercept",
      traceId 
    }), {
      status: error.name === 'AbortError' ? 504 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Defensive: Basic Rate Limiting Check
if (text.length > 2000) {
  return new Response(JSON.stringify({ error: "Payload too large for regulatory processing" }), {
    status: 413,
    headers: corsHeaders
  });
}

