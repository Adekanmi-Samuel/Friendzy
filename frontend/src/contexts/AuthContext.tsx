import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  interests?: string[];
  verified?: boolean;
  premium?: boolean;
  trustScore?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: true,
  login: async () => {}, register: async () => {},
  logout: () => {}, isAuthenticated: false,
});

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getMe()
        .then(data => setUser(data.user))
        .catch(() => { api.clearToken(); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const r = await api.login(email, password);
    setUser(r.user);
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const r = await api.register(data);
    setUser(r.user);
  };

  const logout = () => { api.clearToken(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
