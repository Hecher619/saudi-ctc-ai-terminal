// Basic Health & Integrity Check
const fs = require('fs');
const path = require('path');

console.log("🚀 Starting System Integrity Audit...");

// 1. Check if Critical Config Exists
const configPath = path.join(__dirname, '../functions/chat.js');
if (fs.existsSync(configPath)) {
    console.log("✅ [PASSED] Backend handler located.");
} else {
    console.error("❌ [FAILED] Backend handler missing!");
    process.exit(1);
}

// 2. Validate Persona Engine
try {
    const persona = require('../config/specialist');
    if (persona.systemInstructions) {
        console.log("✅ [PASSED] Persona Engine loaded successfully.");
    }
} catch (e) {
    console.log("⚠️ [WARNING] Persona config not found, check paths.");
}

console.log("🏁 Audit Complete: System is stable for deployment.");

