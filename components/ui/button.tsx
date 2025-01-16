import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";

interface ButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>; // Add proper typing for the style prop
}

export default function Button({
  title,
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.button,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ];
      }}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E1E8ED",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: "#14171A",
    fontWeight: "600",
    fontSize: 14,
  },
});
