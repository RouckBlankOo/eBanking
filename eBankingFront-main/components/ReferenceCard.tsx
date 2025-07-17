import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export const ReferenceCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          <ThemedText style={styles.title}>Reference</ThemedText>
          <ThemedText style={styles.description}>
            Earn up to 40% commission by referring friends
          </ThemedText>
        </View>
        <View style={styles.right}>
          <View style={styles.illustration}>
            <Image
              source={require("@/assets/Icons/ReferenceIcon.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  right: {
    marginLeft: 16,
  },
  illustration: {
    // Add any specific styling for the illustration container
  },
  image: {
    paddingRight: 12,
    width: 90,
    height: 90,
  },
});
