import React from "react";
import { Stack } from "expo-router";
import { TrackProvider } from "@/contexts/track-context";
import color from "@/constants/color";

export default function Layout() {
  return (
    <TrackProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: color.primary,
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
