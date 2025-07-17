import { ThemedText } from "@/components/ThemedText";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
import { RootStackParamList } from "../types";

const VerifyPhoneScreen = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(57);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inputRefs = useRef<TextInput[]>([]);
  const insets = useSafeAreaInsets();

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
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyPhone = async () => {
    const enteredCode = code.join("");

    // Accept any code as valid, no validation required
    // Even if not all 6 digits are entered

    setIsLoading(true);
    setSnackbarVisible(false);

    try {
      // This would be your actual API call
      console.log("Verifying phone with code:", enteredCode);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbarMessage("Phone verified successfully!");
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Phone verification error:", error);
      setSnackbarMessage("Verification failed. Please try again.");
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
      // This would be your actual API call
      console.log("Resending phone verification code");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSnackbarMessage("New verification code sent to your phone");
      setSnackbarVisible(true);
      setTimeLeft(57);
    } catch (error: any) {
      console.error("Resend failed:", error);
      setSnackbarMessage("Failed to resend code. Please try again.");
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

        <BlurView intensity={0.2} style={styles.blurContainer}>
          <ThemedText style={styles.title}>Verify your phone</ThemedText>

          <ThemedText style={styles.description}>
            We sent a verification code to your phone number
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

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              isLoading && styles.verifyButtonDisabled,
            ]}
            onPress={handleVerifyPhone}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.verifyButtonText}>
                Verify Phone
              </ThemedText>
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
  verifyButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
  },
  verifyButtonText: {
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

export default VerifyPhoneScreen;
