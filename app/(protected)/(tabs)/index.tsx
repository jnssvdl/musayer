import Fab from "@/components/ui/fab";
import { View, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import { selectPosts } from "@/api/supabase";
import { getSeveralTracks } from "@/api/spotify";

export default function Home() {
  const { data: token } = useToken();

  const { data: posts } = useQuery({
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

  return (
    <View className="flex-1 bg-zinc-950">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
      <Fab>
        <Link href={"/(protected)/search"}>
          <View className="bg-zinc-700 rounded-full h-16 w-16 justify-center items-center shadow-lg">
            <Ionicons name="add" size={32} color="#d4d4d8" />
          </View>
        </Link>
      </Fab>
    </View>
  );
}
