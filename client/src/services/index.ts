// Export all services from a single entry point
export { sendChatMessage, getLastNConversations } from './chatService';
export type { Message, ChatPayload, ChatResponse } from './chatService';
export { default as axiosInstance } from '../lib/api';

