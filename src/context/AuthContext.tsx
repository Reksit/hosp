import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'AMBULANCE_DRIVER' | 'HOSPITAL_ADMIN' | 'DOCTOR' | 'NURSE';
  hospitalId?: string;
  hospitalName?: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (otp: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<boolean>;
  needsEmailVerification: boolean;
  setNeedsEmailVerification: (needs: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: role.toUpperCase().replace('_', '_')
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData: User = {
          id: data.id.toString(),
          name: data.name,
          email: data.email,
          role: data.role,
          hospitalId: data.hospitalId?.toString(),
          hospitalName: data.hospitalName,
          emailVerified: data.emailVerified
        };

        if (!data.emailVerified) {
          setNeedsEmailVerification(true);
          localStorage.setItem('pendingEmail', email);
          return false;
        }

        setToken(data.token);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const verifyEmail = async (otp: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email?otp=${otp}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setNeedsEmailVerification(false);
        localStorage.removeItem('pendingEmail');
        return true;
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  };

  const resendVerification = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification?email=${email}`, {
        method: 'POST',
      });

      const data = await response.json();
      return response.ok;
    } catch (error) {
      console.error('Resend verification error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    setNeedsEmailVerification(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('pendingEmail');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      token,
      login,
      logout,
      verifyEmail,
      resendVerification,
      needsEmailVerification,
      setNeedsEmailVerification
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