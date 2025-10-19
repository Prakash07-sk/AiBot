import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "bot"]),
  content: z.string(),
  timestamp: z.number(),
});

export const conversationHistorySchema = z.object({
  conversation_history: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
  query: z.string(),
});

export const chatRequestSchema = z.object({
  conversation_history: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
  query: z.string(),
});

export const chatResponseSchema = z.object({
  response: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
export type ConversationHistory = z.infer<typeof conversationHistorySchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
