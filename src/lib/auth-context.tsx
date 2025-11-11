import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from './types';
import { mockUsers } from './mock-data';

interface AuthContextType {
  user: User | null;
  currentRole: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  // Carregar usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('currentRole');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCurrentRole((storedRole as UserRole) || parsedUser.roles[0]);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setCurrentRole(foundUser.roles[0]);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      localStorage.setItem('currentRole', foundUser.roles[0]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
  };

  const switchRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      setCurrentRole(role);
      localStorage.setItem('currentRole', role);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
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
