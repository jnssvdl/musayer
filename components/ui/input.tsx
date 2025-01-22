import React from "react";
import { TextInput, TextInputProps } from "react-native";

const Input: React.FC<TextInputProps> = ({
  className,
  editable = true,
  ...props
}) => {
  return (
    <TextInput
      className="h-12 rounded-lg px-4 text-base bg-zinc-800 text-zinc-50"
      placeholderTextColor="#71717a"
      {...props}
    />
  );
};

export default Input;
