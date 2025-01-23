import React, { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Email and password required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    const error = await signUp({ email, password });
    if (error) {
      console.log(error);
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
        <Text className="text-2xl font-bold text-white mb-2">
          Create account
        </Text>
        <Text className="text-base text-zinc-400">Sign up to get started</Text>
      </View>

      <View className="gap-4">
        <View>
          {/* <Mail color="#a1a1aa" size={20} /> */}
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          {/* <Lock color="#a1a1aa" size={20} /> */}
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          {/* <Lock color="#a1a1aa" size={20} /> */}
          <Input
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Button title="Sign up" onPress={handleSignUp} />
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-zinc-400 text-base">
          Already have an account?{" "}
        </Text>
        <Link href="/sign-in" asChild>
          <Text className="text-zinc-300 font-medium text-base">Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
