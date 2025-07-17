/**
 * Example: ForgotPasswordScreen refactored to use the new theme system
 * This shows how to use the themed components and hooks
 */

import {
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/components/ThemedComponents";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { CONSTANTS } from "../constants";
import { useAlert } from "../context/AlertContext";

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

const ForgotPasswordScreenThemed = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const { showError, showConfirm } = useAlert();

  const handleResetPassword = async () => {
    if (!email) {
      showError("Error", "Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${
          CONSTANTS.API_URL_DEV || CONSTANTS.API_URL_PROD
        }/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log("Forgot Password Response:", data);

      if (data.success) {
        showConfirm(
          "Success",
          data.message,
          () => navigation.navigate("Login"),
          undefined,
          "OK"
        );
      } else {
        showError("Error", data.message);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      showError("Error", "Failed to send reset request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        justifyContent: "center",
      }}
    >
      <ThemedText
        variant="title"
        style={{
          textAlign: "center",
          marginBottom: theme.spacing.sm,
        }}
      >
        Forgot Password
      </ThemedText>

      <ThemedText
        variant="secondary"
        style={{
          textAlign: "center",
          marginBottom: theme.spacing.xl,
        }}
      >
        Enter your email address below and we&apos;ll send you instructions to
        reset your password.
      </ThemedText>

      <LinearGradient
        colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.03)"]}
        style={styles.inputOuterContainer}
      >
        <View style={styles.inputContainer}>
          <ThemedText variant="secondary" style={styles.label}>
            Email Address
          </ThemedText>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail"
              size={20}
              color="#3B82F6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
      </LinearGradient>

      <ThemedButton
        title="Reset Password"
        onPress={handleResetPassword}
        loading={loading}
        variant="primary"
        size="lg"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputOuterContainer: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "monospace",
    paddingVertical: 4,
  },
});

export default ForgotPasswordScreenThemed;
