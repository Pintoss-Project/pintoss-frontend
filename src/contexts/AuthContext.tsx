'use client';

import { fetchUserInfo } from '@/controllers/user/fetchUserInfo';
import { getLocalToken, removeLocalToken, setLocalToken } from '@/utils/localToken';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverToken, initialUser = null }: { children: React.ReactNode, initialUser?: any, serverToken?: string }) {
  const [user, setUser] = useState<any | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialUser);

  const getUserInfo = async () => {
    try {
      const userData = await fetchUserInfo();
      setUser(userData);
      setIsAuthenticated(!!userData);
    } catch (error) {
      console.log("get user info: error:", error);
      setUser(null);
      setIsAuthenticated(false);
      removeLocalToken();
    }
  };

  const login = async (token: string) => {
    setLocalToken(token);
    await getUserInfo();
  };

  const logout = async () => {
    removeLocalToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = getLocalToken();
    if (token) {
      getUserInfo();
    } else if (serverToken) {
      login(serverToken);
    }
  }, [serverToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getUserInfo }}>
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
