import React from "react";
import { Stack } from "expo-router";
import { TrackProvider } from "@/contexts/track-context";

export default function Layout() {
  return (
    <TrackProvider>
      <Stack />
    </TrackProvider>
  );
}
