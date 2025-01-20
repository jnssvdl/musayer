import { Track } from "@/types/track";
import { createContext, useContext, ReactNode, useState } from "react";

type TrackContextType = {
  id: string;
  setId: (id: string) => void;
  track: Track | null;
  setTrack: (track: Track | null) => void;
  note: string;
  setNote: (note: string) => void;
} | null;

export const TrackContext = createContext<TrackContextType>(null);

interface TrackProviderProps {
  children: ReactNode;
}

export function TrackProvider({ children }: TrackProviderProps) {
  const [id, setId] = useState("");
  const [track, setTrack] = useState<Track | null>(null);
  const [note, setNote] = useState("");

  return (
    <TrackContext.Provider
      value={{ track, setTrack, note, setNote, id, setId }}
    >
      {children}
    </TrackContext.Provider>
  );
}
