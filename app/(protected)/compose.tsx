import { View, TextInput, Text } from "react-native";
import React, { useEffect } from "react";
import TrackCard from "@/components/track-card";
import { router, Stack } from "expo-router";
import Button from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { Database } from "@/types/database.types";
import { usePost } from "@/hooks/use-post";

export default function Compose() {
  const { track, note, setNote, id, reset } = usePost();

  const user = useUser();

  const queryClient = useQueryClient();

  const { mutateAsync: create, isPending: isPendingCreate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutateAsync: edit, isPending: isPendingEdit } = useMutation({
    mutationFn: (post: Database["public"]["Tables"]["posts"]["Update"]) =>
      updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["profile-posts"],
      });
    },
  });

  const handlePost = async () => {
    if (!track) return;
    let success = false;
    if (id) {
      const data = await edit({ id: id, note: note });
      success = !!data;
    } else {
      const data = await create({
        profile_id: user.id,
        track_id: track.id,
        note: note,
      });
      success = !!data;
    }
    if (success) {
      reset();
    }
  };

  useEffect(() => {
    if (!track) {
      router.push("/(protected)/(tabs)");
    }
  }, [track]); // Only runs when `track` changes

  if (!track) {
    return null; // Prevent rendering if track is not available
  }

  return (
    <View className="flex-1 bg-zinc-950 p-4">
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Post"
              disabled={isPendingCreate || isPendingEdit}
              onPress={handlePost}
              className="bg-zinc-300 px-4 py-2 rounded-full items-center justify-center"
            />
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
            placeholderTextColor="#71717a"
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
