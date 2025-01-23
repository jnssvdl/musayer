import { View, FlatList, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUserPosts } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { getSeveralTracks } from "@/api/spotify";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import ProfileCard from "@/components/profile-card";
import Fab from "@/components/ui/fab";
import { Link, Stack } from "expo-router";
import { Plus } from "lucide-react-native";

export default function Profile() {
  const user = useUser();

  const { data: token } = useToken();

  const { data: posts, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-950">
        <ActivityIndicator color="#a1a1aa" size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Image
              style={{ height: 56, width: 56 }}
              source={require("../../../assets/images/logo.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          ),
        }}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileCard />}
        renderItem={({ item }) => <PostCard post={item} />}
        ListFooterComponent={<View className="h-5" />}
      />
      <Fab>
        <Link href={"/(protected)/search"}>
          <View className="bg-zinc-700 rounded-full h-16 w-16 justify-center items-center shadow-lg">
            <Plus size={32} color="#d4d4d8" />
          </View>
        </Link>
      </Fab>
    </View>
  );
}
