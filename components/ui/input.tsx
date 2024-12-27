// Input.tsx
import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import type { StyleProp, ViewStyle, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = ({
  label,
  error,
  containerStyle,
  ...props
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          props.multiline && styles.multiline,
        ]}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  // Input styles
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#020617",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
    color: "#020617",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
});
