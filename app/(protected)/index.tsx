import React from "react";
import { Redirect } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { selectProfile } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const user = useUser();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => selectProfile(user),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#a1a1aa" />
      </View>
    );
  }

  if (!profile?.display_name || !profile.username) {
    return <Redirect href={"/(protected)/onboarding"} />;
  }

  return <Redirect href={"/(protected)/(tabs)"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09090b",
  },
});
