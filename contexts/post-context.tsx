import { Track } from "@/types/track";
import { createContext, ReactNode, useState } from "react";

type PostContextType = {
  track: Track | null;
  setTrack: (track: Track | null) => void;
  id: string;
  setId: (id: string) => void;
  note: string;
  setNote: (id: string) => void;
  reset: () => void;
} | null;

export const PostContext = createContext<PostContextType>(null);

interface PostContextProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostContextProps) {
  const [track, setTrack] = useState<Track | null>(null);
  const [note, setNote] = useState("");
  const [id, setId] = useState("");

  const reset = () => {
    setTrack(null);
    setNote("");
    setId("");
  };

  return (
    <PostContext.Provider
      value={{ track, setTrack, id, setId, note, setNote, reset }}
    >
      {children}
    </PostContext.Provider>
  );
}
