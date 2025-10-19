import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post('/api/chat', async (req, res) => {
    try {
      const { conversation_history, query } = req.body;

      if (!query) {
        return res.status(400).json({ 
          error: 'Query is required',
          message: 'Please provide a query in the request body'
        });
      }

      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand. Based on your request, here's what I can tell you...",
        "Thank you for asking. I'd be happy to assist you with this.",
        "Interesting! Here's what I found for you...",
        "I can definitely help with that. Let me provide you with the information.",
        "Great question! Here's a detailed response for you.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setTimeout(() => {
        res.json({
          response: randomResponse + " " + query,
          message: randomResponse + " " + query,
        });
      }, 800);

    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while processing your request'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
