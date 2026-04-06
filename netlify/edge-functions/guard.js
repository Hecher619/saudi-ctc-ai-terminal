import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // This allows the request to continue to your actual AI function
  return; 
};

export const config: Config = {
  path: "/api/chat",   // Change this to the actual path of your AI function
  rateLimit: {
    windowLimit: 20,   // Max 20 requests...
    windowSize: 60,    // ...per 60 seconds
    aggregateBy: ["ip"], // Tracks the attacker's specific IP address
  },
};

