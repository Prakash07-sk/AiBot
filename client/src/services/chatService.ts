import axiosInstance from '../lib/api';
// @ts-ignore - config.js is a JavaScript file
import { getConfig } from '../utils/config';

export interface Message {
  role: 'user' | 'bot' | 'assistant';
  content: string;
  file?: {
    name: string;
    size: number;
    type: string;
    data: string;
  };
}

export interface ChatPayload {
  conversation_history: Message[];
  query: string;
  attachment?: {
    name: string;
    size: number;
    type: string;
    data: string;
  };
}

export interface ChatResponse {
  response?: string;
  message?: string;
  data?: any;
  error?: string;
}

/**
 * Get the last N messages from conversation history
 * @param messages - Array of all messages
 * @param limit - Number of messages to return (default: 10)
 * @returns Array of last N messages
 */
export const getLastNConversations = (
  messages: Message[],
  limit: number = 10
): Message[] => {
  return messages.slice(-limit);
};

/**
 * Transform message roles for API compatibility
 * Maps 'bot' role to 'assistant' for API requests
 * @param messages - Array of messages with 'bot' role
 * @returns Array of messages with 'assistant' role
 */
const transformRolesForAPI = (messages: Message[]): Message[] => {
  return messages.map(msg => ({
    ...msg,
    role: msg.role === 'bot' ? 'assistant' : msg.role,
  }));
};

/**
 * Send a chat message to the backend API
 * @param conversationHistory - Full conversation history
 * @param query - User's query
 * @param attachment - Optional file attachment
 * @returns Promise with chat response
 */
export const sendChatMessage = async (
  conversationHistory: Message[],
  query: string,
  attachment?: {
    name: string;
    size: number;
    type: string;
    data: string;
  }
): Promise<ChatResponse> => {
  try {
    // Get last 10 conversations
    const lastConversations = getLastNConversations(conversationHistory, 10);

    // Transform 'bot' role to 'assistant' for API compatibility
    const apiCompatibleMessages = transformRolesForAPI(lastConversations);

    // Prepare payload
    const payload: ChatPayload = {
      conversation_history: apiCompatibleMessages,
      query: query,
    };

    // Add attachment if provided
    if (attachment) {
      payload.attachment = attachment;
    }

    // Get endpoint from config
    const config = getConfig();
    const endpoint = config.chatEndpoint || '/api/chat';

    // Make API call
    const response = await axiosInstance.post<ChatResponse>(endpoint, payload);

    return response.data;
  } catch (error: any) {
    // Enhanced error handling
    let errorMessage = 'Sorry, I encountered an error. Please try again.';

    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.message || 
                     error.response.data?.error || 
                     `Error: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      // Network error
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else {
      // Request setup error
      errorMessage = error.message || 'An unexpected error occurred.';
    }

    // Throw error with message
    throw new Error(errorMessage);
  }
};

export default sendChatMessage;

