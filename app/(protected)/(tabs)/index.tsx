import Fab from "@/components/ui/fab";
import { View, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import text from "@/constants/text";
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
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.listContent}
      />
      <Fab>
        <Link href={"/(protected)/search"}>
          <Ionicons name="add" size={32} color="#e4e4e7" />
        </Link>
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#09090b",
  },
  placeholderText: {
    color: "#F5F8FA",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    ...text.large,
    marginTop: 8,
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
