import { Config, Context } from "@netlify/edge-functions";

export default async (request, context) => {
  // This allows legitimate users to pass through to the terminal
  return; 
};

export const config = {
  // This protects your specific AI endpoint
  path: "/.netlify/functions/chat", 
  rateLimit: {
    windowLimit: 20,      // Max 20 requests...
    windowSize: 60,       // ...per 60 seconds
    aggregateBy: ["ip"],  // Tracks them by their unique IP address
    action: "limit"       // Blocks them instantly with a 429 error
  },
};

