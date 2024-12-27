import { Image, StyleSheet, Platform, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const greet = () => {
    if (!name) {
      Alert.alert("Hello, World");
    } else {
      Alert.alert(`Hello, ${name}`);
    }
    setName("");
  };
  return (
    <ThemedView>
      <ThemedText>Hello, World</ThemedText>
      <Input
        label="Name"
        onChangeText={(text) => setName(text)}
        value={name}
        multiline
      />
      <Button onPress={greet} variant="default">
        Greet
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
