const persona = require('../../config/specialist');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: 'OK' };

  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = "AIzaSyDPtsPg31hVtBUYwCIblH1sFzBeMmRXVj4";
    const model = "gemini-3.1-flash-lite-preview";
    
    // Fixed URL and added the persona logic here inside the try block
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: persona.systemInstructions + "\n\nUSER_QUERY: " + prompt
          }]
        }]
      })
    });

    const data = await res.json();

    let aiText = "Specialist encountered an empty data packet.";
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      aiText = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      aiText = `API Error: ${data.error.message}`;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: aiText })
    };

  } catch (err) {
    // This catch block is now clean and won't crash the server
    console.error("System Error:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message, text: "Specialist System Failure." })
    };
  }
};

