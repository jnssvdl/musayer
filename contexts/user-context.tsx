import { useAuth } from "@/hooks/use-auth";
import { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren } from "react";

export const UserContext = createContext<User | undefined>(undefined);

export default function UserProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();

  if (!user) {
    throw new Error("UserProvider must be used when a user is authenticated");
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
