import { View, Text, TextInput } from "react-native";
import React from "react";
import { useTrack } from "@/hooks/use-track";
import TrackCard from "@/components/track-card";
import { Input } from "@/components/ui/input";
import { Redirect, router, Stack } from "expo-router";
import { Button } from "@/components/ui/button";

export default function Compose() {
  const { track } = useTrack();

  if (!track) {
    router.back();
    return;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button onPress={() => console.log("Post")}>Post</Button>
          ),
        }}
      />
      <TrackCard track={track} />
      <View style={{ padding: 10 }}>
        <Input multiline placeholder="Write here..." />
        <TextInput multiline style={{ backgroundColor: "white" }} />
      </View>
    </View>
  );
}
