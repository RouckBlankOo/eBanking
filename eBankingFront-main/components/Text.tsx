import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  children?: React.ReactNode;
}

export default function Text({ style, children, ...props }: CustomTextProps) {
  return (
    <RNText style={[defaultTextStyle.text, style]} {...props}>
      {children}
    </RNText>
  );
}

const defaultTextStyle = StyleSheet.create({
  text: {
    fontFamily: "Poppins",
  },
});
