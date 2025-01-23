import React, { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Email and password required");
      return;
    }
    const error = await signIn({ email, password });
    if (error) {
      Alert.alert(error.message);
      return;
    }
  };

  return (
    <View className="flex-1 bg-zinc-950 p-5 justify-center">
      <View className="items-center mb-10">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-32 h-32 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-white mb-2">Welcome back</Text>
        <Text className="text-base text-zinc-400">Sign in to continue</Text>
      </View>

      <View className="gap-4">
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Sign in" onPress={handleSignIn} />
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-zinc-400 text-base">Don't have an account? </Text>
        <Link href="/sign-up" push>
          <Text className="text-zinc-300 font-medium text-base">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
