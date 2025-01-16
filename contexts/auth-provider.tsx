import { supabase } from "@/lib/supabase";
import {
  AuthError,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthResponse = {
  error: AuthError | null;
  success: boolean;
};

export type EmailCredentials = Extract<
  SignUpWithPasswordCredentials,
  { email: string }
>;

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (emailCredentials: EmailCredentials) => Promise<AuthResponse>;
  signIn: (emailCredentials: EmailCredentials) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!router) return;

    if (user) {
      router.replace("/(protected)/(tabs)");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [user, router]);

  const signUp = async (
    emailCredentials: EmailCredentials
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp(emailCredentials);
      if (error) return { error, success: false };
      setUser(data.user);
      return { error: null, success: true };
    } catch (e) {
      const error = e as AuthError;
      console.error(error);
      return { error, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    emailCredentials: EmailCredentials
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        emailCredentials
      );
      if (error) return { error, success: false };
      setUser(data.user);
      return { error: null, success: true };
    } catch (e) {
      const error = e as AuthError;
      console.error(error);
      return { error, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { error, success: false };
      setUser(null);
      return { error: null, success: true };
    } catch (e) {
      const error = e as AuthError;
      console.error(error);
      return { error, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
