import { View, TextInput, Text } from "react-native";
import React from "react";
import { useTrack } from "@/hooks/use-track";
import TrackCard from "@/components/track-card";
import { router, Stack } from "expo-router";
import Button from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { Database } from "@/types/database.types";

export default function Compose() {
  const { track, note, setNote, id } = useTrack();

  if (!track) {
    router.back();
    return null;
  }

  const user = useUser();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const poster = useMutation({
    mutationFn: (post: Database["public"]["Tables"]["posts"]["Update"]) =>
      updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handlePost = async () => {
    if (!note) {
      const data = await mutateAsync({
        profile_id: user.id,
        track_id: track.id,
        note: note,
      });
      if (data) {
        router.replace("/(protected)/(tabs)");
      }
    }
    const data = await poster.mutateAsync({ id: id, note: note });
    if (data) {
      router.replace("/(protected)/(tabs)");
    }
  };

  return (
    <View className="flex-1 bg-zinc-950 p-4">
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button title="Post" disabled={isPending} onPress={handlePost} />
          ),
          title: "Compose",
        }}
      />

      <View className="flex-1">
        <TrackCard track={track} />

        <View className="p-4">
          <TextInput
            multiline
            placeholder="What's on your mind about this track?"
            placeholderTextColor="#3f3f46"
            className="text-zinc-100 text-base leading-6 min-h-[120px] align-top p-0"
            value={note}
            onChangeText={setNote}
            numberOfLines={6}
            maxLength={280}
          />
        </View>

        <View className="px-4 items-end">
          <Text className="text-zinc-500 text-sm">{note.length}/280</Text>
        </View>
      </View>
    </View>
  );
}
