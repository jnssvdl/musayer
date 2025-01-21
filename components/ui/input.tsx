import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={[
        styles.input,
        props.editable === false && styles.disabled,
        props.style,
      ]}
      placeholderTextColor="#3f3f46"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#27272a",
    color: "white",
  },
  disabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
  },
});

export default Input;
