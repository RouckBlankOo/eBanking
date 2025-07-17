import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface ActionButtonProps {
  title: string;
  iconSource: ImageSourcePropType;
  onPress?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  iconSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  title: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
