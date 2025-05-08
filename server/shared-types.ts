// This is a simplified version of the shared types to make deployment easier

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Astrology Types
export interface BirthData {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  location: string;
}

export interface Planet {
  id: string;
  name: string;
  longitude: number;
  speed: number;
  house: number;
  sign: number;
  retrograde: boolean;
}

export interface House {
  id: number;
  longitude: number;
  sign: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
}

export interface NatalChart {
  id: string;
  birthData: BirthData;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
}

// Auth Types
export interface UserProfile {
  id: number;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  subscriptionStatus: 'free' | 'basic' | 'premium';
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  threadId: string;
}

export interface ChatThread {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}