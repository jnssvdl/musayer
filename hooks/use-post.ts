import { PostContext } from "@/contexts/post-context";
import { useContext } from "react";

export function usePost() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }

  return context;
}
