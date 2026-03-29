import axios from 'axios';

const API_URL = '/api';

// Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get(`${API_URL}/auth/profile`);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/auth/profile`, userData);
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  createChat: async (message) => {
    const response = await axios.post(`${API_URL}/chats`, { message });
    return response.data;
  },

  getChats: async () => {
    const response = await axios.get(`${API_URL}/chats`);
    return response.data;
  },

  getChat: async (chatId) => {
    const response = await axios.get(`${API_URL}/chats/${chatId}`);
    return response.data;
  },

  sendMessage: async (chatId, message) => {
    const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, {
      message,
    });
    return response.data;
  },

  searchChats: async (query) => {
    const response = await axios.get(`${API_URL}/chats/search?q=${query}`);
    return response.data;
  },

  deleteChat: async (chatId) => {
    const response = await axios.delete(`${API_URL}/chats/${chatId}`);
    return response.data;
  },

  updateChat: async (chatId, data) => {
    const response = await axios.put(`${API_URL}/chats/${chatId}`, data);
    return response.data;
  },
};
