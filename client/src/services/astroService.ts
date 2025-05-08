import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Reference data
export const getHouseSystems = async () => {
  const response = await axios.get(`${API_URL}/astro/house-systems`);
  return response.data;
};

export const getCelestialBodies = async () => {
  const response = await axios.get(`${API_URL}/astro/celestial-bodies`);
  return response.data;
};

export const getAspects = async () => {
  const response = await axios.get(`${API_URL}/astro/aspects`);
  return response.data;
};

// Chart calculations
export const getBirthChart = async (profileId: string, houseSystem?: string) => {
  const params = houseSystem ? { houseSystem } : {};
  const response = await axios.get(`${API_URL}/astro/chart/${profileId}`, { params });
  return response.data;
};

export const getTransitChart = async (profileId: string, date?: string) => {
  const params = date ? { date } : {};
  const response = await axios.get(`${API_URL}/astro/transit/${profileId}`, { params });
  return response.data;
};

export const getCompositeChart = async (profileId1: string, profileId2: string) => {
  const response = await axios.get(`${API_URL}/astro/composite/${profileId1}/${profileId2}`);
  return response.data;
};

export const calculateChart = async (chartData: {
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  location: string;
  houseSystem?: string;
}) => {
  const response = await axios.post(`${API_URL}/astro/calculate`, chartData);
  return response.data;
};