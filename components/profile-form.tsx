import React, { useState } from "react";
import { View, TouchableOpacity, Image, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Camera } from "lucide-react-native";
import { selectProfile, updateProfile } from "@/api/supabase";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import useUser from "@/hooks/use-user";

export default function ProfileForm() {
  const user = useUser();
  const { data: profile } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => selectProfile(user),
  });

  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setAvatar(result.assets[0]);
    }
  };

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

  // Determine the image source
  const imageSource = avatar
    ? { uri: avatar.uri }
    : profile?.avatar_url
    ? { uri: profile.avatar_url }
    : null;

  return (
    <View>
      <TouchableOpacity onPress={pickImage} className="self-center mb-8">
        {imageSource ? (
          <Image
            source={imageSource}
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
        <Button
          title={profile ? "Save" : "Get started"}
          onPress={handleUpdate}
        />
      </View>
    </View>
  );
}
