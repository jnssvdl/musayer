import { View } from "react-native";
import React from "react";
import ProfileForm from "@/components/profile-form";

export default function Profile() {
  return (
    <View className="flex-1 bg-zinc-950 p-4">
      <ProfileForm />
    </View>
  );
}
