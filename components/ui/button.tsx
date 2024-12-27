import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "default" | "destructive" | "outline";
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const Button = ({
  children,
  onPress,
  variant = "default",
  style,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "outline" ? styles.outlineText : styles.buttonText,
          disabled && styles.disabledText,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 6,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#020617",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#020617",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#020617",
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    backgroundColor: "#e5e7eb",
    borderColor: "#e5e7eb",
  },
  disabledText: {
    color: "#9ca3af",
  },
});
