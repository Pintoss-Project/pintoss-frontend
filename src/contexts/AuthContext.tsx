'use client';

import { apiClient } from '@/controllers/new-api-service';
import { UserInfo } from '@/models/user';
import { getLocalToken, removeLocalToken, setLocalToken } from '@/utils/localToken';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverToken, initialUser = null }: { children: React.ReactNode, initialUser?: any, serverToken?: string }) {
  const [user, setUser] = useState<UserInfo | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialUser);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserInfo = async () => {
    try {
      const userData = await apiClient.getUserInfo();
      setUser(userData.data);
      setIsAuthenticated(!!userData.data);
    } catch (error) {
      console.log("get user info: error:", error);
      setUser(null);
      setIsAuthenticated(false);
      removeLocalToken();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    setLoading(true);
    try {
      setLocalToken(token);
      apiClient.setToken(token);
      await getUserInfo();
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      removeLocalToken();
      setUser(null);
      apiClient.setToken('');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getLocalToken();
    if (token) {
      apiClient.setToken(token);
      getUserInfo().catch(() => {
        console.log('Failed to fetch user info, logging out...');
      });
    } else if (serverToken) {
      login(serverToken);
    } else {
      setLoading(false);
    }
  }, [serverToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
