const getAdminConfig = () => {
  try {
    const saved = localStorage.getItem('chatbot_admin_config');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const getConfig = () => {
  const adminConfig = getAdminConfig();

  // Use envConfig for environment variables.
  const envConfig = {
    apiHost: import.meta.env.VITE_API_HOST,
    chatEndpoint: import.meta.env.VITE_CHAT_ENDPOINT,
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR,
    title: import.meta.env.VITE_TITLE,
    brandingFooterText: import.meta.env.VITE_BRANDING_FOOTER_TEXT,
    brandingName: import.meta.env.VITE_BRANDING_NAME,
    brandingLink: import.meta.env.VITE_BRANDING_LINK,
  };

  return {
    title: adminConfig?.title || envConfig.title || 'Wizz',
    primaryColor: adminConfig?.primaryColor || envConfig.primaryColor || '#3498db',
    apiHost: adminConfig?.apiHost || envConfig.apiHost || 'http://localhost:5000',
    chatEndpoint: adminConfig?.chatEndpoint || envConfig.chatEndpoint || '/api/chat',
    quickSuggestions: adminConfig?.quickSuggestions || [
      'How can you help me?',
      'What services do you offer?',
      'Tell me about your features',
      'How do I get started?',
    ],
    brandingFooterText: adminConfig?.brandingFooterText || 'Powered by',
    brandingName: adminConfig?.brandingName || 'wizzcomAi.com',
    brandingLink: adminConfig?.brandingLink || 'https://wizzcomAi.com',
  };
};

export const config = getConfig();

export default config;