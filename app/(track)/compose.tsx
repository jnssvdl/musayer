import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTrack } from "@/hooks/use-track";
import TrackCard from "@/components/track-card";
import { router, Stack } from "expo-router";
import Button from "@/components/ui/button";

export default function Compose() {
  const { track } = useTrack();
  const [notes, setNotes] = useState("");

  if (!track) {
    router.back();
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => <Button title="Post" disabled={!notes.trim()} />,
          title: "Compose note",
          headerStyle: {
            backgroundColor: "#14171A",
          },
          headerTintColor: "#F5F8FA",
          headerTitleStyle: {
            color: "#F5F8FA",
          },
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
            value={notes}
            onChangeText={setNotes}
            numberOfLines={6}
            maxLength={280}
          />
        </View>

        <View style={styles.characterCount}>
          <Text style={styles.characterCountText}>{notes.length}/280</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14171A",
    padding: 8,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2C3338",
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
