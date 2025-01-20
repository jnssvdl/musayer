import { View, TextInput, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTrack } from "@/hooks/use-track";
import TrackCard from "@/components/track-card";
import { router, Stack } from "expo-router";
import Button from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import color from "@/constants/color";
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
    console.log(data);
    if (data) {
      router.replace("/(protected)/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button title={"Post"} disabled={isPending} onPress={handlePost} />
          ),
          title: "Compose",
        }}
      />

      <View style={styles.content}>
        <TrackCard track={track} />

        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="What's on your mind about this track?"
            placeholderTextColor="#657786"
            style={styles.input}
            value={note}
            onChangeText={setNote}
            numberOfLines={6}
            maxLength={280}
          />
        </View>

        <View style={styles.characterCount}>
          <Text style={styles.characterCountText}>{note.length}/280</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    color: "#F5F8FA",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: "top",
    padding: 0,
  },
  characterCount: {
    padding: 16,
    alignItems: "flex-end",
  },
  characterCountText: {
    color: "#657786",
    fontSize: 14,
  },
});
