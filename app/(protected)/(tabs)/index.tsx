import Fab from "@/components/ui/fab";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Track } from "@/types/track";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";

const fetchTracks = async (ids: string[], token: string): Promise<Track[]> => {
  const url = `https://api.spotify.com/v1/tracks?ids=${ids.join(",")}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.tracks;
};

export default function Home() {
  const { data: token } = useToken();

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from("posts")
        .select("*, profiles (username, full_name, avatar_url )")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      if (!posts || posts.length === 0 || !token) return [];

      const ids = Array.from(new Set(posts.map((post) => post.track_id)));

      const tracks = await fetchTracks(ids, token);

      const map = new Map(tracks.map((track) => [track.id, track]));

      return posts.map((post) => ({
        ...post,
        track: map.get(post.track_id),
      }));
    },
  });

  console.log(posts?.map((posts) => posts.profiles));

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Fab style={styles.fab}>
        <Link href={"/(protected)/(track)"}>
          <View style={styles.fabContent}>
            <Ionicons name="add" size={32} color="#14171A" />
          </View>
        </Link>
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#14171A",
  },
  placeholderText: {
    color: "#F5F8FA",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    color: "#E1E8ED",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#E1E8ED",
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
