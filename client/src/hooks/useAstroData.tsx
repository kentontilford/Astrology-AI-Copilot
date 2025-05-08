import { useState, useEffect } from 'react';
import * as astroService from '../services/astroService';
import { useProfiles } from './useProfiles';

export const useAstroData = (profileId?: string | null) => {
  const { profiles, defaultProfile } = useProfiles();
  const [natalChart, setNatalChart] = useState<any>(null);
  const [transitChart, setTransitChart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch natal chart for the selected profile
  const fetchNatalChart = async (id: string, houseSystem?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await astroService.getBirthChart(id, houseSystem);
      setNatalChart(data);
      return data;
    } catch (err) {
      console.error('Error fetching natal chart:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch natal chart'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch transit chart for the selected profile
  const fetchTransitChart = async (id: string, date?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await astroService.getTransitChart(id, date);
      setTransitChart(data);
      return data;
    } catch (err) {
      console.error('Error fetching transit chart:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch transit chart'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch composite chart between two profiles
  const fetchCompositeChart = async (id1: string, id2: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await astroService.getCompositeChart(id1, id2);
      return data;
    } catch (err) {
      console.error('Error fetching composite chart:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch composite chart'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate a chart from direct data
  const calculateChart = async (chartData: {
    birthDate: string;
    birthTime: string;
    latitude: number;
    longitude: number;
    location: string;
    houseSystem?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await astroService.calculateChart(chartData);
      return data;
    } catch (err) {
      console.error('Error calculating chart:', err);
      setError(err instanceof Error ? err : new Error('Failed to calculate chart'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch chart data when profile ID changes
  useEffect(() => {
    const loadChartData = async () => {
      // If a profile ID is provided, use it; otherwise, use the default profile
      const activeProfileId = profileId || (defaultProfile?.id.toString() ?? null);
      
      if (activeProfileId) {
        await fetchNatalChart(activeProfileId);
        await fetchTransitChart(activeProfileId);
      }
    };
    
    if (profiles.length > 0) {
      loadChartData();
    }
  }, [profileId, defaultProfile?.id, profiles.length]);
  
  return {
    natalChart,
    transitChart,
    isLoading,
    error,
    fetchNatalChart,
    fetchTransitChart,
    fetchCompositeChart,
    calculateChart,
  };
};