import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../../components/Text";
import { useAlert } from "../../context/AlertContext";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { RootStackParamList } from "../../types";

type VerificationStatus = "pending" | "verifying" | "verified";

interface VerificationMethod {
  type: "email" | "phone";
  value: string;
  status: VerificationStatus;
  otp: string;
}

// Define the type for route params
type EmailVerificationRouteProp = RouteProp<
  RootStackParamList,
  "EmailVerification"
>;

const EmailVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EmailVerificationRouteProp>();
  const { showSuccess } = useAlert();
  // showError is removed since we're accepting any OTP as valid

  // Get params from route
  const { newEmail, oldEmail, phoneNumber } = route.params || {
    newEmail: "",
    oldEmail: "",
    phoneNumber: "",
  };

  // Setup verification methods
  const [verificationMethods, setVerificationMethods] = useState<
    VerificationMethod[]
  >([
    {
      type: "email",
      value: oldEmail,
      status: "pending",
      otp: "",
    },
    {
      type: "phone",
      value: phoneNumber,
      status: "pending",
      otp: "",
    },
  ]);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentVerifyingMethod, setCurrentVerifyingMethod] = useState<
    number | null
  >(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const requestOtp = (index: number) => {
    // Update status to verifying
    const updatedMethods = [...verificationMethods];
    updatedMethods[index].status = "verifying";
    setVerificationMethods(updatedMethods);

    // Mock API call to request OTP
    setTimeout(() => {
      setCurrentVerifyingMethod(index);
      setShowOtpModal(true);
    }, 1000);
  };

  const verifyOtp = () => {
    if (currentVerifyingMethod === null) return;

    const method = verificationMethods[currentVerifyingMethod];

    // Accept any OTP input as valid, no validation required
    // Even an empty OTP will be accepted as valid

    // Mock API call to verify OTP
    setTimeout(() => {
      const updatedMethods = [...verificationMethods];
      updatedMethods[currentVerifyingMethod].status = "verified";
      setVerificationMethods(updatedMethods);
      setShowOtpModal(false);

      showSuccess("Verified", `${method.type} verified successfully`, 3000);

      // Check if all methods are verified
      if (updatedMethods.every((m) => m.status === "verified")) {
        // Proceed with email change after successful verification
        setTimeout(() => {
          showSuccess("Email Updated", "Email successfully updated!", 3000);

          // Show a success message and then navigate to Home screen after a short delay
          setTimeout(() => {
            navigation.navigate("MainApp");
          }, 2000);
        }, 1500);
      }
    }, 1500);
  };

  const handleOtpChange = (otp: string) => {
    if (currentVerifyingMethod === null) return;

    const updatedMethods = [...verificationMethods];
    updatedMethods[currentVerifyingMethod].otp = otp;
    setVerificationMethods(updatedMethods);
  };

  const getMethodIcon = (type: "email" | "phone") => {
    return type === "email" ? "mail" : "call";
  };

  const getMethodTitle = (type: "email" | "phone") => {
    return type === "email" ? "Email Verification" : "Phone Verification";
  };

  const getMethodDescription = (type: "email" | "phone", value: string) => {
    return type === "email"
      ? `Verify your current email (${value})`
      : `Verify your phone number (${value})`;
  };

  const getButtonText = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return "Verify";
      case "verifying":
        return "Verifying...";
      case "verified":
        return "Verified";
      default:
        return "Verify";
    }
  };

  return (
    <OnboardingBackground style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Email Change</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContent}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Security Verification</Text>
          <Text style={styles.infoText}>
            To change your email from {oldEmail} to {newEmail}, please verify
            both your current email and phone number.
          </Text>
        </View>

        {/* Verification Methods */}
        <View style={styles.verificationContainer}>
          {verificationMethods.map((method, index) => (
            <LinearGradient
              key={method.type}
              colors={[
                "rgba(255, 255, 255, 0.08)",
                "rgba(255, 255, 255, 0.03)",
              ]}
              style={styles.verificationCard}
            >
              <View style={styles.verificationContent}>
                <View style={styles.verificationIconContainer}>
                  <Ionicons
                    name={getMethodIcon(method.type)}
                    size={24}
                    color="#3B82F6"
                  />
                </View>
                <View style={styles.verificationTextContainer}>
                  <Text style={styles.verificationTitle}>
                    {getMethodTitle(method.type)}
                  </Text>
                  <Text style={styles.verificationDescription}>
                    {getMethodDescription(method.type, method.value)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    method.status === "verified" && styles.verifiedButton,
                    method.status === "verifying" && styles.verifyingButton,
                  ]}
                  onPress={() => requestOtp(index)}
                  disabled={method.status !== "pending"}
                >
                  {method.status === "verifying" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : method.status === "verified" ? (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.verifyButtonText}>
                      {getButtonText(method.status)}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Information about the next steps */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsText}>
            After verifying both methods, your email will be updated to{" "}
            {newEmail}.
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Verification Code</Text>

            <Text style={styles.modalDescription}>
              {currentVerifyingMethod !== null &&
                `We've sent a verification code to your ${
                  verificationMethods[currentVerifyingMethod].type === "email"
                    ? "email"
                    : "phone"
                }`}
            </Text>

            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.08)",
                "rgba(255, 255, 255, 0.03)",
              ]}
              style={styles.otpInputContainer}
            >
              <TextInput
                style={styles.otpInput}
                value={
                  currentVerifyingMethod !== null
                    ? verificationMethods[currentVerifyingMethod].otp
                    : ""
                }
                onChangeText={handleOtpChange}
                placeholder="Enter OTP"
                placeholderTextColor="#FFFFFF60"
                keyboardType="number-pad"
                maxLength={6}
              />
            </LinearGradient>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowOtpModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.verifyOtpButton}
                onPress={verifyOtp}
              >
                <Text style={styles.verifyOtpButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    lineHeight: 24,
  },
  verificationContainer: {
    gap: 16,
  },
  verificationCard: {
    borderRadius: 16,
    overflow: "hidden",
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
  },
  verificationContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  verificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  verificationTextContainer: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  verificationDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  verifyButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  verifiedButton: {
    backgroundColor: "#10B981", // Green color for verified
  },
  verifyingButton: {
    backgroundColor: "#6B7280", // Gray color when verifying
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  nextStepsContainer: {
    marginTop: 30,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  nextStepsText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 20,
    textAlign: "center",
  },
  otpInputContainer: {
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 24,
  },
  otpInput: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 8,
    fontFamily: "monospace",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  verifyOtpButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  verifyOtpButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default EmailVerificationScreen;
