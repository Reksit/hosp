import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ambulance_driver' | 'hospital_admin' | 'doctor' | 'nurse';
  hospitalId?: string;
  ambulanceId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<boolean>;
  needsEmailVerification: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);

  // Mock users for demonstration
  const mockUsers: Record<string, User & { password: string }> = {
    'driver@hospital.com': {
      id: '1',
      name: 'John Driver',
      email: 'driver@hospital.com',
      role: 'ambulance_driver',
      password: 'password123',
      hospitalId: 'h1',
      ambulanceId: 'amb1'
    },
    'admin@hospital.com': {
      id: '2',
      name: 'Sarah Admin',
      email: 'admin@hospital.com',
      role: 'hospital_admin',
      password: 'password123',
      hospitalId: 'h1'
    },
    'doctor@hospital.com': {
      id: '3',
      name: 'Dr. Michael Smith',
      email: 'doctor@hospital.com',
      role: 'doctor',
      password: 'password123',
      hospitalId: 'h1'
    },
    'nurse@hospital.com': {
      id: '4',
      name: 'Lisa Nurse',
      email: 'nurse@hospital.com',
      role: 'nurse',
      password: 'password123',
      hospitalId: 'h1'
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password && mockUser.role === role) {
      // Simulate email verification requirement
      setNeedsEmailVerification(true);
      localStorage.setItem('pendingUser', JSON.stringify({ ...mockUser, password: undefined }));
      return true;
    }
    return false;
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    // Mock email verification - accept any 6-digit code
    if (code.length === 6) {
      const pendingUser = localStorage.getItem('pendingUser');
      if (pendingUser) {
        const user = JSON.parse(pendingUser);
        setUser(user);
        setIsAuthenticated(true);
        setNeedsEmailVerification(false);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('pendingUser');
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setNeedsEmailVerification(false);
    localStorage.removeItem('user');
    localStorage.removeItem('pendingUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      verifyEmail,
      needsEmailVerification
    }}>
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