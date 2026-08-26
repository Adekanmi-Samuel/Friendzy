import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  interests?: string[];
  traits?: string[];
  lookingFor?: string[];
  verified?: boolean;
  premium?: boolean;
  trustScore?: number;
  stats?: { friends: number; chats: number; daysActive: number };
  badges?: Array<{ name: string; color: string }>;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'facebook' | 'twitter') => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  loginWithProvider: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  updateProfile: async () => {},
  isAuthenticated: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

function supabaseUserToUser(supabaseUser: SupabaseUser): User {
  const meta = supabaseUser.user_metadata ?? {};
  return {
    id: supabaseUser.id,
    name: meta.full_name ?? meta.name ?? supabaseUser.email?.split('@')[0] ?? 'User',
    email: supabaseUser.email ?? '',
    avatar_url: meta.avatar_url ?? meta.picture,
    location: meta.location,
    bio: meta.bio,
    interests: meta.interests,
    traits: meta.traits,
    lookingFor: meta.lookingFor,
    verified: meta.verified ?? false,
    premium: meta.premium ?? false,
    trustScore: meta.trustScore ?? 0,
    stats: meta.stats ?? { friends: 0, chats: 0, daysActive: 0 },
    badges: meta.badges ?? [],
    joinDate: meta.joinDate ?? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ? supabaseUserToUser(currentSession.user) : null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ? supabaseUserToUser(currentSession.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.name },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw error;
  }, []);

  const loginWithProvider = useCallback(async (provider: 'google' | 'facebook' | 'twitter') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/settings`,
    });
    if (error) throw error;
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) throw new Error('Not authenticated');

    const { error } = await supabase.auth.updateUser({
      data: {
        ...data,
        full_name: data.name ?? currentUser.user_metadata?.full_name,
      },
    });
    if (error) throw error;

    // Update local user state immediately
    const { data: { user: updatedUser } } = await supabase.auth.getUser();
    if (updatedUser) {
      setUser(supabaseUserToUser(updatedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        register,
        loginWithProvider,
        logout,
        resetPassword,
        updatePassword,
        updateProfile,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}