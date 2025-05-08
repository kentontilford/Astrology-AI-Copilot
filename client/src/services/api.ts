import axios from 'axios';
import { auth } from '@clerk/nextjs';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  try {
    // This only works on the server
    if (typeof window === 'undefined') {
      const { getToken } = auth();
      const token = await getToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  } catch (error) {
    console.error('Error setting auth token:', error);
    return config;
  }
});

// API endpoints
export const authApi = {
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const profilesApi = {
  getAll: async () => {
    const response = await api.get('/profiles');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },
  
  create: async (profileData: any) => {
    const response = await api.post('/profiles', profileData);
    return response.data;
  },
  
  update: async (id: string, profileData: any) => {
    const response = await api.put(`/profiles/${id}`, profileData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/profiles/${id}`);
    return response.data;
  },
};

export default api;