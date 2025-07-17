import { OnboardingBackground } from "@/components/UniversalBackground";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../components/Text";
import { BorderRadius, Colors, Spacing, Typography } from "../constants/Theme";
import { RootStackParamList } from "../types"; // Adjust the import path as necessary

const OnBoardingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <OnboardingBackground>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome To App</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCreateAccount}>
            <View style={[styles.button, styles.createAccountButton]}>
              <Text style={[styles.buttonText, styles.createAccountText]}>
                Create Account
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <View style={[styles.button, styles.logInButton]}>
              <Text style={[styles.buttonText, styles.logInText]}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  statusBarBackground: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  createAccountButton: ViewStyle;
  logInButton: ViewStyle;
  buttonText: TextStyle;
  createAccountText: TextStyle;
  logInText: TextStyle;
}>({
  container: {
    flex: 1,
    // Background handled by UniversalBackground component
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#002657",
    zIndex: 1000,
  },
  titleContainer: {
    flex: 1, // Center vertically
    alignItems: "center",
    paddingTop: 100, // Push title a little down
  },
  title: {
    color: Colors.dark.text, // White: #f1f5f9
    fontSize: Typography.fontSize["4xl"], // 36
    fontWeight: "bold", // 700
    fontFamily: Typography.fontFamily.bold,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg, // 24 units
    paddingBottom: Spacing["2xl"], // 48 units - padding from bottom
    alignItems: "center",
    flexDirection: "column",
    gap: Spacing.md, // 16 units gap between buttons
  },
  button: {
    width: 350, // Full width within container padding
    height: 60, // Increased from 52 to 60 for longer buttons
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BorderRadius["2xl"], // 24 - much more rounded like in the image
  },
  createAccountButton: {
    backgroundColor: Colors.light.card, // White: #ffffff
    borderWidth: 0, // Removed border for cleaner look
  },
  logInButton: {
    backgroundColor: "#0066FF",
  },
  buttonText: {
    fontSize: Typography.fontSize.lg, // 18
    fontWeight: "600", // Semi-bold for better visibility
  },
  createAccountText: {
    color: Colors.primary[500], // Blue text on white button
  },
  logInText: {
    color: Colors.neutral[50], // White: #fafafa
  },
});

export default OnBoardingScreen;
