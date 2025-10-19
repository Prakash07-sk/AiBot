import axios from 'axios';
import config from '../utils/config';

const axiosInstance = axios.create({
  baseURL: config.apiHost,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const sendChatMessage = async (conversationHistory, query, attachment = null) => {
  try {
    const payload = {
      conversation_history: conversationHistory,
      query: query,
    };
    
    if (attachment) {
      payload.attachment = attachment;
    }
    
    const response = await axiosInstance.post(config.chatEndpoint, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
