# Services Documentation

This directory contains all API service calls for the application.

## Structure

```
services/
├── chatService.ts    # Chat API service
├── index.ts          # Service exports
└── README.md         # This file
```

## API Configuration

The backend URL is configured in `/lib/api.ts` and is fetched from:
1. **LocalStorage** (Admin configuration) - Priority 1
2. **Environment Variables** (`VITE_API_HOST`) - Priority 2
3. **Default** (`http://localhost:5000`) - Fallback

## Chat Service

### `sendChatMessage()`

Sends a chat message to the backend API.

**Parameters:**
- `conversationHistory` (Message[]): Full conversation history
- `query` (string): User's query
- `attachment` (optional): File attachment object

**Returns:** Promise<ChatResponse>

**Payload Structure:**
```typescript
{
  conversation_history: Message[],  // Last 10 messages (bot role → assistant)
  query: string,
  attachment?: FileAttachment
}
```

**Example API Payload:**
```json
{
  "conversation_history": [
    {
      "role": "user",
      "content": "Tell me about Dr. Srinivasan"
    },
    {
      "role": "assistant",
      "content": "Dr. Srinivasan is a cardiologist..."
    }
  ],
  "query": "is doctor srinivasan is available for tomorrow?"
}
```

**Response Structure:**
```typescript
{
  response?: string,
  message?: string,
  data?: any,
  error?: string
}
```

### `getLastNConversations()`

Utility function to get the last N messages from conversation history.

**Parameters:**
- `messages` (Message[]): Array of all messages
- `limit` (number): Number of messages to return (default: 10)

**Returns:** Message[]

## Message Types

```typescript
interface Message {
  role: 'user' | 'bot' | 'assistant';
  content: string;
  file?: {
    name: string;
    size: number;
    type: string;
    data: string;  // Base64 encoded
  };
}
```

**Note**: Internally, the chatbot uses `'bot'` role for bot messages. When sending to the API, the service automatically transforms `'bot'` to `'assistant'` for API compatibility.

## Error Handling

All errors are caught and formatted with descriptive messages:

- **Network Errors**: "Unable to connect to the server..."
- **Server Errors**: Status code and message from server
- **Request Errors**: Error message from request setup
- **Unknown Errors**: Generic fallback message

Errors are displayed in the chatbot with special error styling (red alert box).

## Usage Example

```typescript
import { sendChatMessage } from './services';

// Send a message
try {
  const response = await sendChatMessage(
    conversationHistory,
    "Is doctor Srinivasan available for tomorrow?",
    attachment // optional
  );
  console.log(response.response);
} catch (error) {
  console.error(error.message);
}
```

## Axios Instance

The axios instance is configured in `/lib/api.ts` with:
- Base URL from environment
- JSON content type
- 30-second timeout
- Request/response interceptors
- Enhanced error logging

## Environment Variables

Required environment variables (in `.env` file):

```env
VITE_API_HOST=http://localhost:5000
VITE_CHAT_ENDPOINT=/api/chat
```

## Notes

- The service automatically limits conversation history to the last 10 messages
- **Role Transformation**: Bot messages use `'bot'` role internally but are automatically transformed to `'assistant'` when sent to the API
- File attachments are base64 encoded
- All API calls use POST method
- Error messages are user-friendly and displayed with error styling
- **API responses support Markdown formatting** - The chatbot renders markdown including:
  - Headers (H1-H6)
  - Bold, italic, strikethrough text
  - Lists (ordered and unordered)
  - Code blocks and inline code
  - Links
  - Tables
  - Blockquotes
  - Horizontal rules
  - GitHub Flavored Markdown (GFM) features

