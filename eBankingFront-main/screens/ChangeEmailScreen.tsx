import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../components/Text";
import { useAlert } from "../context/AlertContext";
import { OnboardingBackground } from "../components/UniversalBackground";
import { RootStackParamList } from "../types";

const ChangeEmailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { showError } = useAlert();
  const [newEmail, setNewEmail] = useState("");
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (!newEmail) {
      showError("Error", "Please enter a new email address");
      return;
    }

    if (!validateEmail(newEmail)) {
      showError("Error", "Please enter a valid email address");
      return;
    }

    // Navigate to verification screen instead of showing the modal
    navigation.navigate("EmailVerification", {
      newEmail,
      oldEmail: "current@example.com", // Replace with actual user email
      phoneNumber: "+1 (555) 123-4567", // Replace with actual phone number
    });
  };

  return (
    <OnboardingBackground style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Email</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContent}
      >
        <View style={styles.formContainer}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.03)"]}
            style={styles.inputOuterContainer}
          >
            {/* New Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Email</Text>
              <View style={styles.emailInputWrapper}>
                <Ionicons
                  name="mail"
                  size={20}
                  color="#FFFFFF80"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.emailInput}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#FFFFFF60"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Security Warning Modal */}
      <Modal
        visible={showSecurityModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              For security reasons, after the unlinking/ modification of E-mail,
              withdrawals and internal transfers will be disabled for the next
              24 hours and card transactions will be limited to $1000 per
              transaction. The access key (Passkey) you have defined will also
              be reset
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowSecurityModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  setShowSecurityModal(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 40,
  },
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
  },
  blurContainer: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
    marginBottom: 8,
  },
  emailInputWrapper: {
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
  emailInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "monospace",
    paddingVertical: 4,
  },
  buttonContainer: {
    paddingBottom: 40,
    paddingTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
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
    maxWidth: 340,
    width: "100%",
  },
  modalText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 24,
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
  continueButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ChangeEmailScreen;
