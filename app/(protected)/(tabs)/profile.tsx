import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Button from "@/components/ui/button";
import color from "@/constants/color";
import { useQuery } from "@tanstack/react-query";
import { getProfileWithPosts } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { signOut } = useAuth();

  const { user } = useAuth();

  if (!user) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => {
      return getProfileWithPosts(user);
    },
  });

  return (
    <View style={styles.container}>
      {data?.avatar_url && (
        <Image source={{ uri: data.avatar_url }} style={styles.avatar} />
      )}

      {data?.display_name && (
        <Text style={styles.name}>{data.display_name}</Text>
      )}

      {data?.username && <Text style={styles.username}>@{data.username}</Text>}

      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary, // Matching the Home screen background color
    padding: 16,
  },
  placeholderText: {
    color: "red", // Matching the text color for the placeholder
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    color: "#E1E8ED", // Matching the sub-text color
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  das: {
    color: "blue",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  website: {
    fontSize: 16,
    color: "#0066cc",
  },
});
