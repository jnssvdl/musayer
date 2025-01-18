import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { useToken } from "@/hooks/use-token";
import { useQuery } from "@tanstack/react-query";
import { Track } from "@/types/track";
import TrackCard from "@/components/track-card";
import { useTrack } from "@/hooks/use-track";
import text from "@/constants/text";
import color from "@/constants/color";

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

  useEffect(() => {
    if (query.length > 0) {
      refetch();
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <TextInput
              placeholder="Search for tracks..."
              placeholderTextColor={color.secondary}
              onChangeText={setQuery}
              style={styles.searchInput}
              autoFocus
            />
          ),
        }}
      />

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#E1E8ED" size="large" />
          <Text style={text.medium}>Searching tracks...</Text>
        </View>
      ) : query.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={text.large}>Start typing to search</Text>
          <Text style={text.medium}>Find your favorite tracks</Text>
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: track }) => (
            <Pressable
              onPress={() => {
                setTrack(track);
                router.push("/(protected)/compose");
              }}
              style={({ pressed }) => [
                styles.pressable,
                pressed && styles.pressed,
              ]}
            >
              <TrackCard track={track} />
            </Pressable>
          )}
          contentContainerStyle={{ gap: 6 }}
          ListEmptyComponent={
            query.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={text.large}>Start typing to search</Text>
                <Text style={text.medium}>Find your favorite tracks</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    padding: 8,
  },
  searchInput: {
    backgroundColor: "#18181b",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    ...text.small,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  pressable: {
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.8,
  },
});
