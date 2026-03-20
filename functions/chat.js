const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
    // 1. Setup the Brain
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 2. Use the 2026 Stable Model (Stops the 404 error)
    // We are switching from 1.5 to 2.0 because 1.5 paths are being retired.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        const { text } = JSON.parse(event.body);
        const prompt = `You are the CITC AI Specialist. Answer as a Saudi regulatory expert: ${text}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: reply })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "Brain Error: " + error.message })
        };
    }
};

