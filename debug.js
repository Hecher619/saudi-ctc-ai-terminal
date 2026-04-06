// debug.js - Run this in Termux using: node debug.js
const TEST_QUERY = "Hello Specialist, confirm connection.";
const NETLIFY_URL = "https://citc-ai.netlify.app/.netlify/functions/chat";

async function runDiagnostics() {
    console.log("--- STARTING CITC ENGINE DIAGNOSTICS ---");
    console.log(`Target: ${NETLIFY_URL}`);
    console.log(`Payload: { "prompt": "${TEST_QUERY}" }`);
    console.log("---------------------------------------");

    try {
        const response = await fetch(NETLIFY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: TEST_QUERY })
        });

        console.log(`STATUS: ${response.status} ${response.statusText}`);
        
        const rawData = await response.text();
        console.log("RAW RESPONSE FROM SERVER:");
        console.log(rawData);

        try {
            const json = JSON.parse(rawData);
            console.log("---------------------------------------");
            if (json.text) {
                console.log("✅ SUCCESS: Found 'text' property.");
                console.log("AI SAID:", json.text);
            } else if (json.reply) {
                console.log("⚠️ MISMATCH: Found 'reply' instead of 'text'.");
                console.log("Update index.html to use data.reply");
            } else {
                console.log("❌ ERROR: JSON received but no known message property found.");
                console.log("Keys available:", Object.keys(json));
            }
        } catch (e) {
            console.log("❌ ERROR: Server did not return valid JSON.");
        }

    } catch (err) {
        console.log("❌ CRITICAL CONNECTION ERROR:");
        console.log(err.message);
    }
}

runDiagnostics();

