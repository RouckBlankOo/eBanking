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
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../components/Text";
import { useAlert } from "../context/AlertContext";
import { OnboardingBackground } from "../components/UniversalBackground";
import { goBack } from "expo-router/build/global-state/routing";

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const { showError } = useAlert();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showError("Error", "Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Error", "New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      showError("Error", "Password must be at least 8 characters long");
      return;
    }

    // Here you would typically make an API call to change the password
    setShowSecurityModal(true);
  };

  return (
    <OnboardingBackground style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContent}
      >
        {/* Old Password in separate container */}
        <View style={styles.formContainer}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.03)"]}
            style={styles.inputOuterContainer}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Old Password</Text>
              <View style={styles.passwordInputWrapper}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#3B82F6"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.passwordInput}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#FFFFFF60"
                  secureTextEntry={!showOldPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showOldPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#3B82F6"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* New and Confirm Password in another container */}
        <View style={[styles.formContainer, styles.secondFormContainer]}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.03)"]}
            style={styles.inputOuterContainer}
          >
            {/* New Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordInputWrapper}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#3B82F6"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#FFFFFF60"
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showNewPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#3B82F6"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordInputWrapper}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#3B82F6"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#FFFFFF60"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#3B82F6"
                  />
                </TouchableOpacity>
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
                For security reasons, after the unlinking/ modification of
                password, withdrawals and internal transfers will be disabled
                for the next 24 hours and card transactions will be limited to
                $1000 per transaction. The access key (Passkey) you have defined
                will also be reset
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
                    // Here you would typically navigate to the next screen or perform an action
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 40,
  },
  secondFormContainer: {
    marginTop: 20,
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
    opacity: 0.95,
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderRadius: 16,
    overflow: "hidden",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
    marginBottom: 12,
  },
  passwordInputWrapper: {
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
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "monospace",
    paddingVertical: 4,
  },
  eyeButton: {
    padding: 4,
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

export default ChangePasswordScreen;
