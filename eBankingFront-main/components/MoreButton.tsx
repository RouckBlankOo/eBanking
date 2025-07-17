import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";

interface MoreButtonProps {
  onPress: () => void;
  style?: any;
  iconStyle?: any;
  textStyle?: any;
}

export default function MoreButton({
  onPress,
  style,
  iconStyle,
  textStyle,
}: MoreButtonProps) {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <LinearGradient
        colors={["rgba(196, 208, 224, 1)", "rgba(196, 208, 224, 0.6)"]}
        style={[styles.actionIconContainer, iconStyle]}
      >
        <Image
          source={require("../assets/Icons/More.png")}
          style={[styles.actionIcon, iconStyle]}
          resizeMode="contain"
        />
      </LinearGradient>
      <Text style={[styles.actionButtonText, textStyle]}>More</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
