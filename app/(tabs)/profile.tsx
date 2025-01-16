import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Profile</Text>
      <Text style={styles.subText}>Your profile details will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171A", // Matching the Home screen background color
    padding: 16,
  },
  placeholderText: {
    color: "#F5F8FA", // Matching the text color for the placeholder
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    color: "#E1E8ED", // Matching the sub-text color
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
});
