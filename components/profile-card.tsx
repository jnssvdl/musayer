import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { selectProfile } from "@/api/supabase";
import useUser from "@/hooks/use-user";
import { Ellipsis, LogOut, Pencil, UserIcon } from "lucide-react-native"; // for three-dot icon
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";

export default function ProfileCard() {
  const user = useUser();
  const [menuVisible, setMenuVisible] = useState(false);
  const { signOut } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => selectProfile(user),
  });

  const handleSignOut = () => {
    // Call your sign-out logic here, e.g., logout function from auth service
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  if (isLoading) {
    return (
      <View className="p-4 flex justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="p-4 bg-zinc-950 border-b border-zinc-800">
      <View className="flex-row items-center">
        {profile?.avatar_url ? (
          <Image
            source={{ uri: profile.avatar_url }}
            className="w-16 h-16 rounded-full mr-4"
          />
        ) : (
          <View className="w-16 h-16 rounded-full bg-zinc-700 items-center justify-center mr-4">
            <UserIcon color={"#09090b"} size={24} />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-xl font-bold text-zinc-100">
            {profile?.display_name}
          </Text>
          <Text className="text-sm text-zinc-400">@{profile?.username}</Text>
        </View>

        {/* Three dots menu button */}
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ellipsis color="#3f3f46" size={16} />
        </TouchableOpacity>
      </View>

      {/* Profile bio */}
      {profile?.bio && (
        <Text className="text-sm text-zinc-300 mt-2">{profile?.bio}</Text>
      )}

      {/* Modal for menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-end bg-zinc-950/50 "
          onPress={() => setMenuVisible(false)}
        >
          <View className="bg-zinc-950 p-4 rounded-t-xl gap-4">
            <TouchableOpacity
              className="flex-row items-center py-2"
              onPress={() => router.push("/(protected)/edit")}
            >
              <Pencil color={"white"} size={16} />
              <Text className="text-zinc-100 ml-3">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-2 border-t border-zinc-600"
              onPress={handleSignOut}
            >
              <LogOut color="#991b1b" size={16} />
              <Text className="text-red-800 ml-3">Sign out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
