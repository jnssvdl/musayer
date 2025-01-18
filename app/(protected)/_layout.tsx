import React from "react";
import { Redirect, Stack } from "expo-router";
import { TrackProvider } from "@/contexts/track-context";
import color from "@/constants/color";
import { useAuth } from "@/hooks/use-auth";
import UserProvider from "@/contexts/user-context";

export default function Layout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <UserProvider>
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
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="on-boarding" options={{ headerShown: false }} />
        </Stack>
      </TrackProvider>
    </UserProvider>
  );
}
