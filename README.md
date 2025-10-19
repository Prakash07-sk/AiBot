# Embeddable Chatbot Widget

A fully embeddable chatbot widget built with React, Material UI, and SCSS that can be seamlessly integrated into any website via iframe or (soon) script embed.

## Features

- 🎨 **Modern AI Design** – Gradient themes & smooth animations
- 💬 **Floating Widget** – Pops out from a minimized chat bubble
- 📱 **Responsive** – Works on desktop & mobile
- 💾 **Message Persistence** – Conversation saved in your browser
- 📎 **File Upload** – Attach images and documents
- ⚙️ **Admin Panel** – Easy runtime configuration for colors, title, suggestions, and more
- 🔌 **Easy Embedding** – Integrate via iframe or script tag (script coming soon)

## Local Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example env file and edit with your values:
   ```bash
   cp .env.example .env
   ```

   Example `.env` settings:
   ```env
   # Server
   PORT=5000
   HOST=localhost
   NODE_ENV=development

   # Chatbot API (Frontend)
   VITE_API_HOST=http://localhost:5000
   VITE_CHAT_ENDPOINT=/api/chat

   # Branding & Theme
   VITE_PRIMARY_COLOR=#3498db
   VITE_TITLE=Smart Assistant

   # (Optional)
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit: [http://localhost:5000](http://localhost:5000)

## Project Structure

```
/client/src
  /components/chatbot
    - ChatWidget.jsx         # Floating chat bubble
    - FullDialog.jsx         # Expanded modal dialog
    - MessageBubble.jsx      # User/bot message display
    - SuggestionButtons.jsx  # Quick suggestion buttons
    - LoadingIndicator.jsx   # Typing/loading animation
    - BrandingFooter.jsx     # Powered by branding
  /services
    - chatService.js         # Axios API integration
  /utils
    - config.js              # Dynamic configuration
  /pages
    - Home.jsx               # Demo page
    - Embed.jsx              # Embed code generator
    - Admin.jsx              # Configuration panel
```

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Run production build
- `npm run check` – Type checking

## API Integration

The chatbot expects a POST endpoint like:

**Request**
```json
{
  "conversation_history": [
    { "role": "user", "content": "Hello" },
    { "role": "bot", "content": "Hi there!" }
  ],
  "query": "Your message here"
}
```

**Response**
```json
{
  "response": "Bot response text"
}
```

Set your API endpoint in `.env`:
```env
VITE_API_HOST=http://localhost:5000
VITE_CHAT_ENDPOINT=/api/chat
```

## Customization

### Admin Panel

Visit `/admin` to configure:
- Widget title & primary color
- API host and endpoint
- Quick suggestion messages
- Branding footer

### Environment Variables

All settings can also be pre-configured via environment variables (see `.env.example`).

## Embedding

### Option 1: iframe Embed
```html
<iframe 
  src="http://localhost:5000/?embed=true" 
  style="position: fixed; bottom: 20px; right: 20px; border: none; z-index: 999999;"
  width="400" 
  height="600"
></iframe>
```

### Option 2: Script Tag *(Coming Soon)*
Script tag embedding support planned.

## Technology Stack

- **Frontend:** React, Material UI, SCSS
- **Backend:** Express.js, Node.js
- **Build Tool:** Vite
- **API Client:** Axios
- **Styling:** SCSS with iframe-safe isolation

## License

MIT
