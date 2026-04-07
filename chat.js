const persona = require('../../config/specialist');
const features = require('../../config/features');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: 'OK' };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;
        
        
        const model = "gemini-3.1-flash-lite-preview";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        
        const processedPrompt = features.processQuery(prompt);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ 
                        text: persona.systemInstructions + "\n\n" + processedPrompt 
                    }]
                }]
            })
        });

        const data = await response.json();

        
        let aiText = "Specialist encountered a data packet error.";
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            aiText = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            aiText = `CST_GATEWAY_ERROR: ${data.error.message}`;
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ text: aiText })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ text: "CRITICAL_UPLINK_FAILURE: " + error.message })
        };
    }
};

