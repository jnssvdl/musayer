import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUserPosts } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { getSeveralTracks } from "@/api/spotify";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import ProfileCard from "@/components/profile-card";
import { Stack } from "expo-router";
import Button from "@/components/ui/button";

export default function Profile() {
  const { signOut } = useAuth();

  const user = useUser();

  const { data: token } = useToken();

  const { data: posts } = useQuery({
    queryKey: ["profile-posts"],
    queryFn: async () => {
      const posts = await selectUserPosts(user);
      const ids = Array.from(new Set(posts.map((post) => post.track_id)));
      const tracks = await getSeveralTracks(ids, token);
      const map = new Map(tracks.map((track) => [track.id, track]));
      return posts.map((post) => ({
        ...post,
        track: map.get(post.track_id),
      }));
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => <Button title="Sign out" onPress={signOut} />,
        }}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileCard />}
        renderItem={({ item }) => <PostCard post={item} />}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#09090b",
  },
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
  signOutButton: {
    backgroundColor: "#3f3f46",
    padding: 8,
    borderRadius: 8,
  },
  posts: {
    padding: 16,
  },
});
