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
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
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

const { width } = Dimensions.get("window");

const CodeConfirmationScreen = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(57); // 57 seconds countdown
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CodeConfirmation">>();
  const inputRefs = useRef<TextInput[]>([]);
  const insets = useSafeAreaInsets();

  // Get params from navigation
  const { contactInfo, signupMode } = route.params;

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

    if (enteredCode.length !== 6) {
      setSnackbarMessage("Please enter the complete 6-digit code");
      setSnackbarVisible(true);
      return;
    }

    // Static verification - any 6-digit code works
    console.log("Code entered:", enteredCode, "for", contactInfo);

    // Navigate directly to password setup screen
    navigation.navigate("SetPassword", {
      contactInfo,
      signupMode,
    });
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    try {
      // Here you would make an API call to resend the code
      console.log("Resending code to:", contactInfo);

      setSnackbarMessage(
        `New code sent to ${getMaskedContactInfo(contactInfo)}`
      );
      setSnackbarVisible(true);
      setTimeLeft(57); // Reset timer
    } catch (error) {
      console.error("Resend failed:", error);
      setSnackbarMessage("Failed to resend code. Please try again.");
      setSnackbarVisible(true);
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
                ref={(ref) => (inputRefs.current[index] = ref!)}
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
              code.join("").length !== 6 && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirmCode}
            disabled={code.join("").length !== 6}
          >
            <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
          </TouchableOpacity>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <ThemedText style={styles.resendText}>
              Didn&apos;t receive the code?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={timeLeft > 0}
            >
              <ThemedText
                style={[
                  styles.resendLink,
                  timeLeft > 0 && styles.resendLinkDisabled,
                ]}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend"}
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
