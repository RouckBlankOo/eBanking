import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface DiscountsContentProps {
  onLearnMorePress?: () => void;
}

export const DiscountsContent: React.FC<DiscountsContentProps> = ({
  onLearnMorePress,
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.description}>
        Earn up to $50 in vouchers
      </ThemedText>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.learnMoreButton}
          onPress={onLearnMorePress}
        >
          <ThemedText style={styles.learnMoreText}>Learn even more</ThemedText>
          <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
        </TouchableOpacity>

        <ThemedText style={styles.progressIndicator}>2/5</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
    marginRight: 4,
  },
  progressIndicator: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
});
