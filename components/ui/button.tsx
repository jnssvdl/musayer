import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity
      className="bg-zinc-300 p-3 rounded-full items-center justify-center"
      {...props}
    >
      <Text className="text-zinc-950 text-base font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
