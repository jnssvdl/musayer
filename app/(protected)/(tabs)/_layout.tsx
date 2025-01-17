import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import color from "@/constants/color";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#09090b", // Dark background color for tab bar
          borderTopWidth: 0.2,
          borderColor: color.secondary,
        },
        tabBarActiveTintColor: "#F5F8FA", // Active tab color (white)
        tabBarInactiveTintColor: "#A0AAB2", // Inactive tab color (light grey)
        tabBarLabelStyle: {
          display: "none",
        },
        headerStyle: {
          backgroundColor: "#09090b",
          borderBottomWidth: 0.2,
          borderColor: "#3f3f46",
        },
        headerTintColor: "#F5F8FA",
        headerTitleStyle: {
          color: "#F5F8FA",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
