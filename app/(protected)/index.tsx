import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/supabase";

export default function Index() {
  const { user } = useAuth();

  if (!user) return null;

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => {
      if (!user) return;
      return getProfile(user);
    },
  });

  // Handle error state
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong. Please try again.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Move styles to a constant to avoid recreation on each render
  if (!profile?.display_name || !profile.username) {
    return <Redirect href={"/(protected)/on-boarding"} />;
  }

  return <Redirect href={"/(protected)/(tabs)"} />;
}

// Extract styles to avoid recreation on each render
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
