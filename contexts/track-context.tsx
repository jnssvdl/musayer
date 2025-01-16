import { Track } from "@/types/track";
import { createContext, useContext, ReactNode, useState } from "react";

type TrackContextType = {
  track: Track | null;
  setTrack: (track: Track) => void;
} | null;

export const TrackContext = createContext<TrackContextType>(null);

interface TrackProviderProps {
  children: ReactNode;
}

export function TrackProvider({ children }: TrackProviderProps) {
  const [track, setTrack] = useState<Track | null>(null);

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
}
