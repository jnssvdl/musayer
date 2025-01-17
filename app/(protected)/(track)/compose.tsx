import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTrack } from "@/hooks/use-track";
import TrackCard from "@/components/track-card";
import { Redirect, router, Stack } from "expo-router";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Database } from "@/types/database.types";
import { supabase } from "@/lib/supabase";
import color from "@/constants/color";

export default function Compose() {
  const { track } = useTrack();
  const [note, setNote] = useState("");
  const { user } = useAuth();

  if (!track) {
    router.back();
    return null;
  }

  const queryClient = useQueryClient();

  const {
    mutateAsync: insertPost,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({
      user_id,
      track_id,
      note,
    }: Database["public"]["Tables"]["posts"]["Insert"]) => {
      console.log("here");
      const { data, error } = await supabase
        .from("posts")
        .insert({ user_id, track_id, note })
        .select();
      if (error) console.log(error);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handlePost = async () => {
    if (!user || !track) return;
    const data = await insertPost({
      user_id: user.id,
      track_id: track.id,
      note: note,
    });
    if (data) {
      router.replace("/(protected)/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title={isPending ? "Posting" : "Post"}
              disabled={isPending}
              onPress={handlePost}
            />
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
