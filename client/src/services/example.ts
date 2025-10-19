/**
 * Example usage of the Chat Service API
 * This file demonstrates how to use the chat service in your components
 */

import { sendChatMessage, getLastNConversations } from './chatService';
import type { Message, ChatResponse } from './chatService';

// Example 1: Basic message sending
export const exampleBasicMessage = async () => {
  const conversationHistory: Message[] = [
    { role: 'user', content: 'Hello' },
    { role: 'bot', content: 'Hi there! How can I help you?' },
  ];

  try {
    const response: ChatResponse = await sendChatMessage(
      conversationHistory,
      'is doctor srinivasan is available for tomorrow?'
    );

    console.log('Bot response:', response.response);
    return response;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Example 2: Message with file attachment
export const exampleMessageWithAttachment = async () => {
  const conversationHistory: Message[] = [];

  const attachment = {
    name: 'document.pdf',
    size: 1024,
    type: 'application/pdf',
    data: 'base64encodeddata...', // Base64 encoded file
  };

  try {
    const response = await sendChatMessage(
      conversationHistory,
      'Can you analyze this document?',
      attachment
    );

    console.log('Bot response:', response.response);
    return response;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Example 3: Get last N conversations
export const exampleGetLastConversations = () => {
  const allMessages: Message[] = [
    { role: 'user', content: 'Message 1' },
    { role: 'bot', content: 'Response 1' },
    { role: 'user', content: 'Message 2' },
    { role: 'bot', content: 'Response 2' },
    { role: 'user', content: 'Message 3' },
    { role: 'bot', content: 'Response 3' },
    { role: 'user', content: 'Message 4' },
    { role: 'bot', content: 'Response 4' },
    { role: 'user', content: 'Message 5' },
    { role: 'bot', content: 'Response 5' },
    { role: 'user', content: 'Message 6' },
    { role: 'bot', content: 'Response 6' },
    { role: 'user', content: 'Message 7' },
    { role: 'bot', content: 'Response 7' },
    { role: 'user', content: 'Message 8' },
    { role: 'bot', content: 'Response 8' },
    { role: 'user', content: 'Message 9' },
    { role: 'bot', content: 'Response 9' },
    { role: 'user', content: 'Message 10' },
    { role: 'bot', content: 'Response 10' },
    { role: 'user', content: 'Message 11' },
    { role: 'bot', content: 'Response 11' },
  ];

  // Get last 10 messages (default)
  const last10 = getLastNConversations(allMessages);
  console.log('Last 10 messages:', last10);

  // Get last 5 messages
  const last5 = getLastNConversations(allMessages, 5);
  console.log('Last 5 messages:', last5);

  return { last10, last5 };
};

// Example 4: Error handling
export const exampleErrorHandling = async () => {
  const conversationHistory: Message[] = [];

  try {
    const response = await sendChatMessage(
      conversationHistory,
      'Test message'
    );

    return response;
  } catch (error: any) {
    // Error is already formatted with user-friendly message
    console.error('Caught error:', error.message);

    // You can check error type if needed
    if (error.message.includes('Unable to connect')) {
      console.log('Network error occurred');
    } else if (error.message.includes('Error:')) {
      console.log('Server error occurred');
    }

    // Re-throw or handle as needed
    throw error;
  }
};

// Example 5: React component usage
export const exampleReactComponent = `
import { useState } from 'react';
import { sendChatMessage } from './services';
import type { Message } from './services';

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(
        messages,
        input
      );

      const botMessage: Message = {
        role: 'bot',
        content: response.response || 'No response',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'bot',
        content: error.message,
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your chat UI here */}
    </div>
  );
};

export default ChatComponent;
`;

