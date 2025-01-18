import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export default function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
