import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { updateProfile } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Camera } from "lucide-react-native";

export default function OnboardingScreen() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const { signOut } = useAuth();
  const user = useUser();
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setAvatar(result.assets[0]);
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
    },
  });

  const handleUpdate = async () => {
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
    <View className="flex-1 bg-zinc-950 justify-center p-5">
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-white mb-2">
          Create your profile
        </Text>
        <Text className="text-base text-zinc-400">
          Let's get to know you better
        </Text>
      </View>

      <TouchableOpacity onPress={pickImage} className="self-center mb-8">
        {avatar ? (
          <Image
            source={{ uri: avatar.uri }}
            className="w-[150px] h-[150px] rounded-full border-3 border-zinc-600"
          />
        ) : (
          <View className="w-[150px] h-[150px] rounded-full bg-zinc-900 border-3 border-zinc-600 justify-center items-center">
            <Camera size={40} color="#6b7280" />
            <Text className="text-zinc-400 text-sm mt-2">Add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View className="gap-4">
        <Input
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Display name"
          placeholderTextColor="#6b7280"
        />
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
        />
        <Button title="Get started" onPress={handleUpdate} />
        <Button title="Sign out" onPress={signOut} />
      </View>
    </View>
  );
}
