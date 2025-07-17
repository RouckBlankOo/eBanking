import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { useAlert } from "../../context/AlertContext";

type DocumentType = "passport" | "driving" | "national";

const DocumentUploadScreen = () => {
  const navigation = useNavigation();
  const { showError, showConfirm, showInfo } = useAlert();
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentType>("driving");
  const [documentNumber, setDocumentNumber] = useState(
    "apartment, suite, etc. (optional)"
  );
  const [issuingCountry, setIssuingCountry] = useState("France");
  const [nationality, setNationality] = useState("France");
  const [expiryDate, setExpiryDate] = useState("00/00/0000");

  const handleContinue = () => {
    // Basic validation
    if (!documentNumber || !issuingCountry || !nationality) {
      showError("Error", "Please fill in all required fields");
      return;
    }

    // Navigate back to main app or show success
    showConfirm(
      "Success",
      "Identity verification completed successfully!",
      () => navigation.navigate("MainApp" as never),
      undefined,
      "OK"
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDocumentSelect = (type: DocumentType) => {
    setSelectedDocument(type);
  };

  const handleCountrySelect = (type: "issuing" | "nationality") => {
    showInfo("Country Selection", "Country selection feature coming soon");
  };

  const handleAddPhoto = (photoType: string) => {
    showInfo("Add Photo", `${photoType} upload feature coming soon`);
  };

  const renderDocumentOption = (
    type: DocumentType,
    icon: string,
    title: string,
    subtitle: string
  ) => {
    const isSelected = selectedDocument === type;
    return (
      <TouchableOpacity
        style={[
          styles.documentOption,
          isSelected && styles.documentOptionSelected,
        ]}
        onPress={() => handleDocumentSelect(type)}
      >
        <View style={styles.documentIcon}>
          <Ionicons
            name={icon as any}
            size={32}
            color={isSelected ? "#3B82F6" : "rgba(255, 255, 255, 0.6)"}
          />
        </View>
        <View style={styles.documentInfo}>
          <Text
            style={[
              styles.documentTitle,
              isSelected && styles.documentTitleSelected,
            ]}
          >
            {title}
          </Text>
          <Text style={styles.documentSubtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPhotoUpload = (label: string) => (
    <TouchableOpacity
      style={styles.photoUploadContainer}
      onPress={() => handleAddPhoto(label)}
    >
      <View style={styles.photoUploadIcon}>
        <Ionicons name="camera-outline" size={32} color="#3B82F6" />
      </View>
      <Text style={styles.photoUploadLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <OnboardingBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Identity Verification</Text>
              <Text style={styles.subtitle}>
                Verify your identity with official documents
              </Text>
            </View>

            {/* Document Selection */}
            <View style={styles.documentSelection}>
              {renderDocumentOption(
                "passport",
                "document-text-outline",
                "Passport",
                ""
              )}
              {renderDocumentOption(
                "driving",
                "car-outline",
                "Driving License",
                ""
              )}
              {renderDocumentOption(
                "national",
                "card-outline",
                "National ID Card",
                ""
              )}
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Document Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Document Number</Text>
                <TextInput
                  style={styles.input}
                  value={documentNumber}
                  onChangeText={setDocumentNumber}
                  placeholder="apartment, suite, etc. (optional)"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                />
              </View>

              {/* Country and Nationality Row */}
              <View style={styles.countryRow}>
                <View style={[styles.inputGroup, styles.countryInput]}>
                  <Text style={styles.inputLabel}>Issuing Country</Text>
                  <TouchableOpacity
                    style={styles.countryContainer}
                    onPress={() => handleCountrySelect("issuing")}
                  >
                    <View style={styles.countryContent}>
                      <View style={styles.countryFlag}>
                        <Text style={styles.flagEmoji}>🇫🇷</Text>
                      </View>
                      <Text style={styles.countryText}>{issuingCountry}</Text>
                    </View>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, styles.countryInput]}>
                  <Text style={styles.inputLabel}>Nationality</Text>
                  <TouchableOpacity
                    style={styles.countryContainer}
                    onPress={() => handleCountrySelect("nationality")}
                  >
                    <View style={styles.countryContent}>
                      <View style={styles.countryFlag}>
                        <Text style={styles.flagEmoji}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</Text>
                      </View>
                      <Text style={styles.countryText}>{nationality}</Text>
                    </View>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expiry Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Expiry Date (Optional)</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.dateInput}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="00/00/0000"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  />
                </View>
              </View>

              {/* Document Photos */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Document Photos</Text>
                <View style={styles.photoRow}>
                  {renderPhotoUpload("Add Photo")}
                  {renderPhotoUpload("Add Photo")}
                  {renderPhotoUpload("Add Photo")}
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 24,
  },
  documentSelection: {
    marginBottom: 32,
  },
  documentOption: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  documentOptionSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  documentIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  documentTitleSelected: {
    color: "#3B82F6",
  },
  documentSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
  formSection: {
    flex: 1,
  },
  inputGroup: {
    paddingRight: 40,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  countryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countryInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  countryContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  countryContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countryFlag: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  flagEmoji: {
    fontSize: 14,
  },
  countryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  dateInputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dateInput: {
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  photoRow: {
    marginLeft: -20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoUploadContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  photoUploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  photoUploadLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  continueButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DocumentUploadScreen;
