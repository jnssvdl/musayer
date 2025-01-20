import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import color from "@/constants/color";
import { useQuery } from "@tanstack/react-query";
import { selectProfile, selectUserPosts } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import text from "@/constants/text";
import { getSeveralTracks } from "@/api/spotify";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";

export default function Profile() {
  const { signOut } = useAuth();

  const user = useUser();

  const { data: token } = useToken();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => selectProfile(user),
  });

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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {profile?.avatar_url ? (
                <Image
                  source={{ uri: profile.avatar_url }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.placeholderAvatar}>
                  <Text style={text.large}>?</Text>
                </View>
              )}
              <View style={styles.headerInfo}>
                <Text style={text.large}>
                  {profile?.display_name || "Anonymous"}
                </Text>
                <Text style={text.medium}>
                  @{profile?.username || "unknown"}
                </Text>
              </View>
            </View>
            {profile?.bio && <Text style={text.small}>{profile?.bio}</Text>}
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
  },
  header: {
    padding: 16,
    gap: 8,
    backgroundColor: color.primary,
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
    backgroundColor: color.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  signOutButton: {
    backgroundColor: color.secondary,
    padding: 8,
    borderRadius: 8,
  },
  posts: {
    padding: 16,
  },
});
