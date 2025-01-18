import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { updateProfile } from "@/api/supabase";
import { configureProps } from "react-native-reanimated/lib/typescript/ConfigHelper";

export default function OnboardingScreen() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const { user, signOut } = useAuth();
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true, // Enable base64 encoding
    });

    if (!result.canceled && result.assets[0].base64) {
      setAvatar(result.assets[0]);
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  const handleSubmit = async () => {
    if (!user) return;

    if (!displayName || !username) {
      Alert.alert("Display name or username cannot be blank");
      return;
    }

    if (username.length < 3) {
      Alert.alert("Invalid username");
      return;
    }

    const { error } = await mutateAsync({
      user,
      avatar,
      displayName,
      username,
    });

    if (error) {
      Alert.alert("Username is already taken");
      return;
    }

    router.replace("/(protected)/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Profile</Text>
          <Text style={styles.subtitle}>Let's get to know you better</Text>
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {avatar ? (
            <Image source={{ uri: avatar.uri }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color="#6b7280" />
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Display name"
            placeholderTextColor="#6b7280"
          />

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#6b7280"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a1a1aa",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#3f3f46",
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#18181b",
    borderWidth: 3,
    borderColor: "#3f3f46",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#a1a1aa",
    fontSize: 14,
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#18181b",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
