import { supabase } from "@/lib/supabase";
import {
  AuthError,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";
import { QueryCache } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type EmailCredentials = Extract<
  SignUpWithPasswordCredentials,
  { email: string }
>;

type AuthContextType = {
  user: User | null;
  signUp: (emailCredentials: EmailCredentials) => Promise<AuthError | null>;
  signIn: (emailCredentials: EmailCredentials) => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const queryCache = new QueryCache();

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
      router.replace("/(protected)");
    } else {
      router.replace("/sign-in");
    }
  }, [user, router]);

  const signUp = async (emailCredentials: EmailCredentials) => {
    const { data, error } = await supabase.auth.signUp(emailCredentials);
    setUser(data.user);
    return error;
  };

  const signIn = async (emailCredentials: EmailCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(
      emailCredentials
    );
    setUser(data.user);
    return error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    queryCache.clear();
    return error;
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
