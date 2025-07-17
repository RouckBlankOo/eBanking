import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface EmptyStateProps {
  message?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "Nothing Yet",
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={[styles.text, textStyle]}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
  },
  text: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    textAlign: "center",
  },
});
