import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedComponents";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { useTheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { CONSTANTS } from "../../constants/index";
import { useUser } from "../../context/UserContext";
import { RootStackParamList } from "../../types";

// Import icon images
const AppleIcon = require("../../assets/Icons/AppleIcon.png");
const GoogleIcon = require("../../assets/Icons/GoogleIcon.png");

const { width, height } = Dimensions.get("window");
// Use development URL for local testing, change to API_URL_PROD for production
const API_URL = CONSTANTS.API_URL_DEV || CONSTANTS.API_URL_PROD;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [inputType, setInputType] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const { setUser } = useUser();

  const countries = [
    { name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  ];

  const handleLogin = async () => {
    setSnackbarVisible(false);
    setSnackbarMessage("");

    const loginData = inputType === "email" ? email : phone;

    // Validation
    if (!loginData) {
      setSnackbarMessage(
        inputType === "email" ? "Email is required" : "Phone number is required"
      );
      setSnackbarVisible(true);
      return;
    }
    if (inputType === "email" && !/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Please enter a valid email address");
      setSnackbarVisible(true);
      return;
    }
    if (inputType === "phone" && !/^\d{10,15}$/.test(phone)) {
      setSnackbarMessage("Please enter a valid phone number");
      setSnackbarVisible(true);
      return;
    }
    if (!password) {
      setSnackbarMessage("Password is required");
      setSnackbarVisible(true);
      return;
    }

    if (inputType === "phone") {
      setSnackbarMessage("Phone login is not yet implemented");
      setSnackbarVisible(true);
      return;
    }

    // API request for email login
    setLoading(true);
    try {
      console.log("Attempting login to:", `${API_URL}/auth/login`);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });

      console.log("Response status:", response.status, "ok:", response.ok);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store JWT token
      await AsyncStorage.setItem("jwtToken", data.token);
      console.log("Login successful, token stored");

      // Initialize user in context with backend data
      setUser({
        fullName: data.user?.fullName || email.split("@")[0],
        email: email,
        phone: data.user?.phoneNumber || "",
        isAuthenticated: true,
        profileCompletionStatus: data.user?.profileCompletionStatus || {
          personalInformation: false,
          addressInformation: false,
          identityVerification: false,
        },
      });

      // Navigate to Main App
      navigation.navigate("MainApp");
    } catch (error: any) {
      console.error("Login error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      if (error.message.includes("Network request failed")) {
        setSnackbarMessage(
          "Cannot connect to server. Please check your internet connection."
        );
      } else if (error.message.includes("Invalid credentials")) {
        setSnackbarMessage("Invalid email or password");
      } else {
        setSnackbarMessage(error.message || "Login failed. Please try again.");
      }
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <BlurView
        intensity={0.2}
        style={[styles.blurContainer, { paddingTop: insets.top + 20 }]}
      >
        <ThemedText variant="title" style={styles.title}>
          Sign In
        </ThemedText>

        {/* Input Type Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              inputType === "email" && styles.toggleButtonActive,
            ]}
            onPress={() => setInputType("email")}
          >
            <ThemedText
              style={[
                styles.toggleText,
                inputType === "email" && styles.toggleTextActive,
              ]}
            >
              Email
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              inputType === "phone" && styles.toggleButtonActive,
            ]}
            onPress={() => setInputType("phone")}
          >
            <ThemedText
              style={[
                styles.toggleText,
                inputType === "phone" && styles.toggleTextActive,
              ]}
            >
              Phone
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        {inputType === "email" && (
          <View style={styles.inputWrapper}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail"
                size={20}
                color={theme.colors.current.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={theme.colors.current.textSecondary}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputUnderline} />
          </View>
        )}

        {/* Phone Input */}
        {inputType === "phone" && (
          <View style={styles.inputWrapper}>
            <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call"
                size={20}
                color={theme.colors.current.textSecondary}
                style={styles.inputIcon}
              />
              <TouchableOpacity
                style={styles.countryCodeContainer}
                onPress={() => setModalVisible(true)}
              >
                <ThemedText style={styles.countryCodeText}>
                  {countryCode}
                </ThemedText>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={theme.colors.current.textSecondary}
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="99 999 999"
                keyboardType="phone-pad"
                placeholderTextColor={theme.colors.current.textSecondary}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.inputUnderline} />
          </View>
        )}

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <ThemedText style={styles.inputLabel}>Password</ThemedText>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={20}
              color={theme.colors.current.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={theme.colors.current.textSecondary}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye"}
                size={20}
                color={theme.colors.current.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputUnderline} />
        </View>

        {/* Sign In Button */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary[500]}
            style={styles.loadingIndicator}
          />
        ) : (
          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <ThemedText style={styles.signInButtonText}>Sign In</ThemedText>
          </TouchableOpacity>
        )}

        {/* Social Login */}
        <View style={styles.socialSection}>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Image
                source={GoogleIcon}
                style={styles.socialIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <ThemedText variant="secondary" style={styles.orText}>
              or
            </ThemedText>
            <TouchableOpacity style={styles.socialIcon}>
              <Image
                source={AppleIcon}
                style={styles.socialIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpSection}>
          <ThemedText variant="secondary" style={styles.signUpText}>
            I&apos;m a new user.{" "}
          </ThemedText>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <ThemedText style={styles.signUpLink}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>

      {/* Country Code Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <BlurView intensity={20} style={styles.modalBlurView}>
            <View style={styles.modalContent}>
              <FlatList
                data={countries}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.countryItem,
                      { borderBottomColor: theme.colors.current.border },
                    ]}
                    onPress={() => {
                      setCountryCode(item.code);
                      setModalVisible(false);
                    }}
                  >
                    <ThemedText style={styles.countryFlag}>
                      {item.flag}
                    </ThemedText>
                    <ThemedText style={styles.countryName}>
                      {item.name}
                    </ThemedText>
                    <ThemedText
                      variant="secondary"
                      style={styles.countryCodeModal}
                    >
                      {item.code}
                    </ThemedText>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[
                  styles.closeModalButton,
                  { backgroundColor: theme.colors.primary[500] },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText
                  style={[
                    styles.closeModalText,
                    { color: theme.colors.neutral[50] },
                  ]}
                >
                  Close
                </ThemedText>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    justifyContent: "center",
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 1000,
  },
  blurContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginVertical: 120,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "rgba(0, 102, 255, 0.8)",
  },
  toggleText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
  },
  toggleTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 4,
    minHeight: 56,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginTop: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    paddingVertical: 12,
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    marginRight: 12,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)",
  },
  countryCodeText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 4,
  },
  phoneInput: {
    marginLeft: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  signInButton: {
    backgroundColor: "#0066FF",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  socialSection: {
    marginBottom: 30,
  },
  socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  socialIconImage: {
    width: 24,
    height: 24,
  },
  orText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
  },
  signUpLink: {
    color: "#0066FF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBlurView: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  modalContent: {
    borderRadius: 16,
    width: width * 0.85,
    maxHeight: height * 0.6,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  countryCodeModal: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  closeModalButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#0066FF",
  },
  closeModalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  snackbar: {
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderRadius: 12,
  },
});
