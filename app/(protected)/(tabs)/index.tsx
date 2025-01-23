import Fab from "@/components/ui/fab";
import { View, FlatList, ActivityIndicator, Text, Image } from "react-native";
import { Link, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import { selectPosts } from "@/api/supabase";
import { getSeveralTracks } from "@/api/spotify";
import { Plus } from "lucide-react-native";

export default function Home() {
  const { data: token } = useToken();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await selectPosts();
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
              source={require("../../../assets/images/icons.png")}
              className="w-14 h-14"
              resizeMode="contain"
            />
          ),
        }}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
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
