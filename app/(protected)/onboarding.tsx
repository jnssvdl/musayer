import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/hooks/use-auth";

import Button from "@/components/ui/button";
import ProfileForm from "@/components/profile-form";

export default function OnboardingScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 bg-zinc-950 justify-center p-4 gap-4">
      <View className="items-center">
        <Text className="text-2xl font-bold text-zinc-100 mb-2">
          Create your profile
        </Text>
        <Text className="text-base text-zinc-400">
          Let's get to know you better
        </Text>
      </View>
      <ProfileForm />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
