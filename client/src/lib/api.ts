import axios from 'axios';

// Get backend URL from environment variables
const getBackendUrl = (): string => {
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Try to get from localStorage (admin config)
    try {
      const adminConfig = localStorage.getItem('chatbot_admin_config');
      if (adminConfig) {
        const parsed = JSON.parse(adminConfig);
        if (parsed.apiHost) {
          return parsed.apiHost;
        }
      }
    } catch (error) {
      console.error('Error parsing admin config:', error);
    }
  }

  // Fallback to environment variable
  return import.meta.env.VITE_API_HOST || 'http://localhost:5000';
};

// Create axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response
      console.error('API Network Error:', error.request);
    } else {
      // Error in request setup
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { getBackendUrl };

