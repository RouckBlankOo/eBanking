import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface VerificationBannerProps {
  onVerifyPress?: () => void;
  onDismiss?: () => void;
}

export const VerificationBanner: React.FC<VerificationBannerProps> = ({
  onVerifyPress,
  onDismiss,
}) => {
  return (
    <View style={styles.container}>
      {/* Gradient overlay for extra visual appeal */}
      <View style={styles.gradientOverlay} />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>Verify your identity</ThemedText>
          <ThemedText style={styles.subtitle}>
            Start your spending journey today.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          {onDismiss && (
            <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
              <Ionicons name="close" size={16} color="#64748B" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.verifyButton} onPress={onVerifyPress}>
            <ThemedText style={styles.verifyButtonText}>Verify</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(59, 130, 246, 0.02)",
    borderRadius: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  dismissButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    fontWeight: "500",
  },
  verifyButton: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
