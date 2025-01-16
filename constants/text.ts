// src/styles.js

import { StyleSheet } from "react-native";

// Define generic text sizes
const text = StyleSheet.create({
  large: {
    fontSize: 16, // Larger size for headings or prominent text
    fontWeight: "bold",
    color: "white", // Dark color for high contrast
  },
  medium: {
    fontSize: 14, // Standard size for body text or main content
    color: "#666", // Slightly lighter color for general text
  },
  small: {
    fontSize: 12, // Smaller size for captions or secondary info
    color: "#999", // Light color for less important text
  },
});

export default text;
