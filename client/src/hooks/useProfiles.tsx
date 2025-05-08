import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

interface BirthProfile {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  location: string;
  notes?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateProfileData {
  name: string;
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  location: string;
  notes?: string;
  isDefault?: boolean;
}

interface UpdateProfileData extends Partial<CreateProfileData> {
  id: number;
}

interface ProfilesContextType {
  profiles: BirthProfile[];
  defaultProfile: BirthProfile | null;
  loading: boolean;
  error: Error | null;
  fetchProfiles: () => Promise<void>;
  getProfileById: (id: number) => BirthProfile | null;
  createProfile: (data: CreateProfileData) => Promise<BirthProfile>;
  updateProfile: (data: UpdateProfileData) => Promise<BirthProfile>;
  deleteProfile: (id: number) => Promise<void>;
  setDefaultProfile: (id: number) => Promise<BirthProfile>;
}

const ProfilesContext = createContext<ProfilesContextType>({
  profiles: [],
  defaultProfile: null,
  loading: false,
  error: null,
  fetchProfiles: async () => {},
  getProfileById: () => null,
  createProfile: async () => ({} as BirthProfile),
  updateProfile: async () => ({} as BirthProfile),
  deleteProfile: async () => {},
  setDefaultProfile: async () => ({} as BirthProfile),
});

export const ProfilesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<BirthProfile[]>([]);
  const [defaultProfile, setDefaultProfile] = useState<BirthProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  
  // Fetch all profiles
  const fetchProfiles = async () => {
    if (authLoading || !user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${apiUrl}/profiles`);
      const profilesData = response.data;
      
      setProfiles(profilesData);
      
      // Find default profile
      const defaultProfile = profilesData.find((p: BirthProfile) => p.isDefault);
      setDefaultProfile(defaultProfile || null);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch profiles'));
    } finally {
      setLoading(false);
    }
  };
  
  // Get a profile by ID
  const getProfileById = (id: number) => {
    return profiles.find(p => p.id === id) || null;
  };
  
  // Create a new profile
  const createProfile = async (data: CreateProfileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${apiUrl}/profiles`, data);
      const newProfile = response.data;
      
      // Update profiles state
      await fetchProfiles();
      
      return newProfile;
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to create profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update a profile
  const updateProfile = async (data: UpdateProfileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put(`${apiUrl}/profiles/${data.id}`, data);
      const updatedProfile = response.data;
      
      // Update profiles state
      await fetchProfiles();
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a profile
  const deleteProfile = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.delete(`${apiUrl}/profiles/${id}`);
      
      // Update profiles state
      await fetchProfiles();
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Set a profile as default
  const setDefaultProfile = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${apiUrl}/profiles/${id}/default`);
      const updatedProfile = response.data;
      
      // Update profiles state
      await fetchProfiles();
      
      return updatedProfile;
    } catch (err) {
      console.error('Error setting default profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to set default profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch profiles on mount or when user changes
  useEffect(() => {
    if (user) {
      fetchProfiles();
    } else {
      setProfiles([]);
      setDefaultProfile(null);
    }
  }, [user]);
  
  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        defaultProfile,
        loading,
        error,
        fetchProfiles,
        getProfileById,
        createProfile,
        updateProfile,
        deleteProfile,
        setDefaultProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfilesContext);