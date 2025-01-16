import React from "react";
import { Stack } from "expo-router";
import { TrackProvider } from "@/contexts/track-context";

export default function Layout() {
  return (
    <TrackProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#14171A",
          },
          headerTintColor: "#F5F8FA",
          headerTitleStyle: {
            color: "#F5F8FA",
          },
        }}
      />
    </TrackProvider>
  );
}
