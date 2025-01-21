import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { useToken } from "@/hooks/use-token";
import { useQuery } from "@tanstack/react-query";
import { Track } from "@/types/track";
import TrackCard from "@/components/track-card";
import { useTrack } from "@/hooks/use-track";
import Input from "@/components/ui/input";

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
    const debounce = setTimeout(() => {
      refetch();
    }, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <View className="flex-1 bg-zinc-950 p-2">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Input
              placeholder="Search for tracks..."
              onChangeText={setQuery}
              autoFocus
            />
          ),
        }}
      />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#E1E8ED" size="large" />
          <Text className="text-zinc-400">Searching tracks...</Text>
        </View>
      ) : query.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-zinc-400 text-base">
            Start typing to search
          </Text>
          <Text className="text-zinc-500 text-sm">
            Find your favorite tracks
          </Text>
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
              className="overflow-hidden active:opacity-80"
            >
              <TrackCard track={track} />
            </Pressable>
          )}
          contentContainerStyle={{ gap: 6 }}
        />
      )}
    </View>
  );
}
