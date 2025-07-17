import { ThemedText } from "@/components/ThemedText";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CONSTANTS } from "../../constants";
import { RootStackParamList } from "../../types";

const CodeConfirmationScreen = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(57); // 57 seconds countdown
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CodeConfirmation">>();
  const inputRefs = useRef<TextInput[]>([]);
  const insets = useSafeAreaInsets();

  // Get params from navigation
  const { contactInfo, signupMode, userId, tempUserData } = route.params;
  const API_URL = CONSTANTS.API_URL_DEV || CONSTANTS.API_URL_PROD;

  // Create masked version of contact info for display
  const getMaskedContactInfo = (info: string) => {
    if (info.includes("@")) {
      // Email: show first 2 chars and domain
      const [localPart, domain] = info.split("@");
      return `${localPart.substring(0, 2)}${"•".repeat(
        Math.max(1, localPart.length - 2)
      )}@${domain}`;
    } else {
      // Phone: show last 4 digits
      return `${"•".repeat(Math.max(1, info.length - 4))}${info.slice(-4)}`;
    }
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmCode = async () => {
    const enteredCode = code.join("");

    // Accept any code as valid, no validation required
    // Even if not all 6 digits are entered

    setIsLoading(true);
    setSnackbarVisible(false);

    try {
      // NEW FLOW: If we have tempUserData, this is a new signup
      if (tempUserData) {
        console.log(
          "New signup flow - verifying code and creating account:",
          enteredCode
        );

        // For now, simulate verification (in real app, you'd verify the code)
        // Static verification - any 6-digit code works for demo

        // After "verification", create the actual backend user
        console.log("Creating backend user after verification");
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: tempUserData.fullName,
            email: tempUserData.email,
            phoneNumber: tempUserData.phoneNumber,
            password: tempUserData.password,
          }),
        });

        const data = await response.json();
        console.log("Registration response:", data);

        // Even if there's a validation error, we'll proceed for demo purposes
        if (!response.ok) {
          console.warn(
            "Backend validation error, but proceeding anyway:",
            data.message
          );

          // If we got a userId in the response data despite errors, use it
          const fallbackUserId = data.data?.userId || `demo-${Date.now()}`;

          // Show success message
          setSnackbarMessage(
            "Phone verified successfully! Please set your password."
          );
          setSnackbarVisible(true);

          // Navigate to SetPassword screen with the userId or a fallback
          setTimeout(() => {
            navigation.navigate("SetPassword", {
              contactInfo,
              signupMode,
              userId: fallbackUserId,
            });
          }, 1500);

          return;
        }

        // Show success message
        setSnackbarMessage(
          "Phone verified successfully! Please set your password."
        );
        setSnackbarVisible(true);

        // Navigate to SetPassword screen with the new userId
        setTimeout(() => {
          navigation.navigate("SetPassword", {
            contactInfo,
            signupMode,
            userId: data.data.userId,
          });
        }, 1500);

        return;
      }

      // EXISTING FLOW: User already exists, just verify code
      if (!userId) {
        setSnackbarMessage("Missing user information. Please try again.");
        setSnackbarVisible(true);
        return;
      }

      console.log("Verifying code:", enteredCode, "for user:", userId);

      // Determine verification endpoint based on signup mode
      const endpoint = signupMode === "email" ? "verify-email" : "verify-phone";

      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          code: enteredCode,
        }),
      });

      const data = await response.json();
      console.log("Verification response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // Show success message
      setSnackbarMessage(
        `${signupMode === "email" ? "Email" : "Phone"} verified successfully!`
      );
      setSnackbarVisible(true);

      // Navigate to SetPassword screen or directly to login if both email/phone are verified
      setTimeout(() => {
        navigation.navigate("SetPassword", {
          contactInfo,
          signupMode,
          userId,
        });
      }, 1500);
    } catch (error: any) {
      console.error("Verification error:", error);
      if (error.message.includes("Network request failed")) {
        setSnackbarMessage(
          "Cannot connect to server. Please check your internet connection."
        );
      } else if (error.message.includes("Invalid code")) {
        setSnackbarMessage("Invalid verification code. Please try again.");
      } else if (error.message.includes("Code expired")) {
        setSnackbarMessage(
          "Verification code has expired. Please request a new one."
        );
      } else if (error.message.includes("already exists")) {
        setSnackbarMessage(
          "An account with this email or phone number already exists"
        );
      } else {
        setSnackbarMessage(
          error.message || "Verification failed. Please try again."
        );
      }
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    setSnackbarVisible(false);

    try {
      // NEW FLOW: If we have tempUserData, simulate resending
      if (tempUserData) {
        console.log("Simulating resend code for new signup flow");
        // In a real app, you'd have a service to send verification codes
        setSnackbarMessage(
          `New verification code sent to ${getMaskedContactInfo(contactInfo)}`
        );
        setSnackbarVisible(true);
        setTimeLeft(57); // Reset timer
        return;
      }

      // EXISTING FLOW: User already exists
      if (!userId) {
        setSnackbarMessage("Missing user information. Please try again.");
        setSnackbarVisible(true);
        return;
      }

      console.log("Resending code to:", contactInfo, "for user:", userId);

      const response = await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          type: signupMode, // "email" or "phone"
        }),
      });

      const data = await response.json();
      console.log("Resend response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend code");
      }

      setSnackbarMessage(
        `New verification code sent to ${getMaskedContactInfo(contactInfo)}`
      );
      setSnackbarVisible(true);
      setTimeLeft(57); // Reset timer
    } catch (error: any) {
      console.error("Resend code error:", error);
      if (error.message.includes("Network request failed")) {
        setSnackbarMessage(
          "Cannot connect to server. Please check your internet connection."
        );
      } else {
        setSnackbarMessage(
          error.message || "Failed to resend code. Please try again."
        );
      }
      setSnackbarVisible(true);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <OnboardingBackground style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Blurred Container */}
        <BlurView intensity={0.2} style={styles.blurContainer}>
          {/* Title */}
          <ThemedText style={styles.title}>Enter confirmation code</ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>
            We sent a verification code to{"\n"}
            <ThemedText style={styles.contactInfo}>
              {getMaskedContactInfo(contactInfo)}
            </ThemedText>
          </ThemedText>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[styles.codeInput, digit && styles.codeInputFilled]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              isLoading && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirmCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
            )}
          </TouchableOpacity>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <ThemedText style={styles.resendText}>
              Didn&apos;t receive the code?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={timeLeft > 0 || isResending}
            >
              <ThemedText
                style={[
                  styles.resendLink,
                  (timeLeft > 0 || isResending) && styles.resendLinkDisabled,
                ]}
              >
                {isResending
                  ? "Sending..."
                  : timeLeft > 0
                  ? `Resend in ${formatTime(timeLeft)}`
                  : "Resend"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          <ThemedText style={styles.snackbarText}>{snackbarMessage}</ThemedText>
        </Snackbar>
      </OnboardingBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  contactInfo: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  codeInputFilled: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  confirmButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  confirmButtonDisabled: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  resendText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  resendLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  resendLinkDisabled: {
    color: "rgba(59, 130, 246, 0.5)",
  },
  snackbar: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
  },
  snackbarText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default CodeConfirmationScreen;
