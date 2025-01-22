import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface FabProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export default function Fab({ children, ...props }: FabProps) {
  return (
    <TouchableOpacity
      className="absolute right-4 bottom-4 rounded-full items-center justify-center shadow-lg"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
