import { TrackContext } from "@/contexts/track-context";
import { useContext } from "react";

export function useTrack() {
  const context = useContext(TrackContext);

  if (!context) {
    throw new Error("useTrack must be used within a TrackProvider");
  }

  return context;
}
