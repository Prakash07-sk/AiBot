import type { Message } from "@shared/schema";

export interface IStorage {
  // Add any storage methods needed for the chatbot
  // Currently using in-memory messages in the frontend
}

export class MemStorage implements IStorage {
  private messages: Map<string, Message>;

  constructor() {
    this.messages = new Map();
  }
}

export const storage = new MemStorage();
