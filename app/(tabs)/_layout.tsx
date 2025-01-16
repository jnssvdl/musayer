import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#14171A", // Dark background color for tab bar
        },
        tabBarActiveTintColor: "#F5F8FA", // Active tab color (white)
        tabBarInactiveTintColor: "#A0AAB2", // Inactive tab color (light grey)
        tabBarLabelStyle: {
          display: "none",
        },
        headerStyle: {
          backgroundColor: "#14171A",
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
