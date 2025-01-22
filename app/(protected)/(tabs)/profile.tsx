import { View, FlatList } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUserPosts } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { getSeveralTracks } from "@/api/spotify";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import ProfileCard from "@/components/profile-card";

export default function Profile() {
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
    <View className="flex-1 bg-zinc-950">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileCard />}
        renderItem={({ item }) => <PostCard post={item} />}
        ListFooterComponent={<View className="h-5" />}
      />
    </View>
  );
}
