import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { useToken } from "@/hooks/use-token";
import { useQuery } from "@tanstack/react-query";
import { Track } from "@/types/track";
import TrackCard from "@/components/track-card";
import { useTrack } from "@/hooks/use-track";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data: token } = useToken();
  const { setTrack } = useTrack();

  const {
    data: tracks,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tracks", query],
    queryFn: async (): Promise<Track[]> => {
      if (!query) return [];
      const params = new URLSearchParams({
        q: query,
        type: "track",
        limit: "10",
      });
      const response = await fetch(
        `https://api.spotify.com/v1/search?${params.toString()}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.tracks.items;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleChangeText = (text: string) => {
    setQuery(text);
  };

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View>
              <TextInput placeholder="Search" onChangeText={handleChangeText} />
            </View>
          ),
        }}
      />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: track }) => (
            <Pressable
              onPress={() => {
                setTrack(track);
                router.push("/(track)/compose");
              }}
            >
              <TrackCard track={track} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
