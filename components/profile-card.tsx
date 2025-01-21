import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectProfile } from "@/api/supabase";
import useUser from "@/hooks/use-user";

export default function ProfileCard() {
  const user = useUser();
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => selectProfile(user),
  });

  if (isLoading) {
    return (
      <View
        style={[
          styles.header,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {profile?.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#f4f4f5",
              }}
            >
              ?
            </Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#f4f4f5",
            }}
          >
            {profile?.display_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#71717a",
            }}
          >
            @{profile?.username}
          </Text>
        </View>
      </View>
      {profile?.bio && (
        <Text
          style={{
            fontSize: 14,
            color: "#fafafa",
          }}
        >
          {profile?.bio}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    gap: 8,
    backgroundColor: "#09090b",
    borderBottomWidth: 0.5,
    borderColor: "#27272a",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  placeholderAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3f3f46",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
});
