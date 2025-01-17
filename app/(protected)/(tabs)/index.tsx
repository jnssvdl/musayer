import Fab from "@/components/ui/fab";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Track } from "@/types/track";
import { useToken } from "@/hooks/use-token";
import PostCard from "@/components/post-card";
import text from "@/constants/text";
import color from "@/constants/color";

const fetchTracks = async (
  ids: string[],
  token: string | undefined
): Promise<Track[]> => {
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

      if (!posts || posts.length === 0) return [];

      const ids = Array.from(new Set(posts.map((post) => post.track_id)));

      const tracks = await fetchTracks(ids, token);

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
