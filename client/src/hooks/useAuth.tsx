import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';
import { authApi } from '../services/api';

interface User {
  id: number | null;
  clerkId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  subscriptionStatus: 'free' | 'basic' | 'premium';
  subscriptionExpiresAt?: Date;
  isNewUser: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  refetchUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded: isClerkLoaded, isSignedIn } = useClerkAuth();
  const { user: clerkUser } = useUser();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchUser = async () => {
    if (!isSignedIn || !isClerkLoaded) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isClerkLoaded) {
      fetchUser();
    }
  }, [isClerkLoaded, isSignedIn, clerkUser?.id]);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: !isClerkLoaded || isLoading,
        error,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);