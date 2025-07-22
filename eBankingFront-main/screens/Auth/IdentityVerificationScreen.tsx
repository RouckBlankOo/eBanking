import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CountryInput from "../../components/CountryInput";
import CountrySelector from "../../components/CountrySelector";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { useAlert } from "../../context/AlertContext";
import { useUser } from "../../context/UserContext";
import { RootStackParamList } from "../../types";

type DocumentType = "passport" | "driving" | "national";
type CountrySelectType = "issuing" | "nationality";

const IdentityVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { updateProfileStatus } = useUser();
  const { showError, showSuccess, showInfo, showConfirm } = useAlert();
  const insets = useSafeAreaInsets();
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentType>("passport");
  const [documentNumber, setDocumentNumber] = useState(
    "apartment, suite, etc. (optional)"
  );
  const [issuingCountry, setIssuingCountry] = useState("France");
  const [nationality, setNationality] = useState("Tunisia");
  const [expiryDate, setExpiryDate] = useState("00/00/0000");
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySelectType, setCountrySelectType] =
    useState<CountrySelectType>("issuing");

  const handleContinue = () => {
    // Basic validation
    if (!documentNumber || !issuingCountry || !nationality) {
      showError("Error", "Please fill in all required fields");
      return;
    }

    // Mark identity verification as complete
    updateProfileStatus("identityVerification", true);

    // Complete verification and go back to main app
    showConfirm(
      "Success",
      "Identity verification completed successfully!",
      () => navigation.navigate("MainApp"),
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

  const handleCountrySelect = (type: CountrySelectType) => {
    setCountrySelectType(type);
    setCountryModalVisible(true);
  };

  const handleCountrySelection = (selectedCountry: string) => {
    if (countrySelectType === "issuing") {
      setIssuingCountry(selectedCountry);
    } else {
      setNationality(selectedCountry);
    }
  };

  const handleAddPhoto = (photoType: string) => {
    showInfo("Add Photo", `${photoType} upload feature coming soon`);
  };

  const renderDocumentOption = (
    type: DocumentType,
    imageSource: any,
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
          <Image
            source={imageSource}
            style={[
              styles.documentImage,
              {
                tintColor: isSelected ? "#3B82F6" : "rgba(255, 255, 255, 0.6)",
              },
            ]}
            resizeMode="contain"
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

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#000000" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
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
            <View style={styles.sectionContainer}>
              {/* Title Section */}
              <View style={styles.titleSection}>
                <Text style={styles.title}>Identity Verification</Text>
                <Text style={styles.subtitle}>
                  Verify your identity with official documents
                </Text>
              </View>

              {/* Main Form Container */}

              {/* Document Selection */}
              <View style={styles.documentSelection}>
                <View style={styles.documentRow}>
                  {renderDocumentOption(
                    "passport",
                    require("@/assets/Icons/Passport.png"),
                    "Passport",
                    ""
                  )}
                  {renderDocumentOption(
                    "driving",
                    require("@/assets/Icons/License.png"),
                    "Driving License",
                    ""
                  )}
                  {renderDocumentOption(
                    "national",
                    require("@/assets/Icons/Nationality.png"),
                    "National ID Card",
                    ""
                  )}
                </View>
              </View>

              {/* Form Fields */}
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
                  <CountryInput
                    label="Issuing Country"
                    selectedCountry={issuingCountry}
                    onPress={() => handleCountrySelect("issuing")}
                    style={styles.countryInput}
                  />

                  <CountryInput
                    label="Nationality"
                    selectedCountry={nationality}
                    onPress={() => handleCountrySelect("nationality")}
                    style={styles.countryInput}
                  />
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
                  <View
                    style={[
                      styles.photoRow,
                      selectedDocument !== "passport" && {
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    {selectedDocument === "passport" ? (
                      // Passport needs only one photo
                      <View style={styles.photoUploadContainer}>
                        <TouchableOpacity
                          style={styles.photoUploadIcon}
                          onPress={() => handleAddPhoto("Add Photo")}
                        >
                          <Image
                            source={require("@/assets/Icons/AddPhoto.png")}
                            style={styles.addPhotoImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      // Driving License and National ID need two photos
                      <>
                        <View
                          style={[
                            styles.photoUploadContainer,
                            { flex: 1, marginRight: 8 },
                          ]}
                        >
                          <TouchableOpacity
                            style={styles.photoUploadIcon}
                            onPress={() => handleAddPhoto("Add Photo")}
                          >
                            <Image
                              source={require("@/assets/Icons/AddPhoto.png")}
                              style={styles.addPhotoImage}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.photoUploadContainer,
                            { flex: 1, marginLeft: 8 },
                          ]}
                        >
                          <TouchableOpacity
                            style={styles.photoUploadIcon}
                            onPress={() => handleAddPhoto("Add Photo")}
                          >
                            <Image
                              source={require("@/assets/Icons/AddPhoto.png")}
                              style={styles.addPhotoImage}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Country Selection Modal */}
      <CountrySelector
        visible={isCountryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        onSelect={handleCountrySelection}
        selectedCountry={
          countrySelectType === "issuing" ? issuingCountry : nationality
        }
        title={`Select ${
          countrySelectType === "issuing" ? "Issuing Country" : "Nationality"
        }`}
      />
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    flex: 1,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#002657",
    zIndex: 1000,
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
    padding: 7,
  },
  sectionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 40,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
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
    marginBottom: 24,
  },
  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  documentOption: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    minHeight: 90,
  },
  documentOptionSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  documentInfo: {
    alignItems: "center",
  },
  documentTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 16,
  },
  documentTitleSelected: {
    color: "#3B82F6",
  },
  documentSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
  formSection: {
    marginTop: 0,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "transparent",
    padding: 16,
    paddingLeft: 0,
    color: "#FFFFFF",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  countryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countryInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  dateInputContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  dateInput: {
    padding: 16,
    paddingLeft: 0,
    color: "#FFFFFF",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
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
  documentImage: {
    width: 32,
    height: 32,
  },
  photoRow: {
    flexDirection: "row",
    marginLeft: -35, // Adjusted to align with the document photos
    marginBottom: -30, // Adjusted to align with the document photos
    marginTop: 10, // Adjusted to align with the document photos
    justifyContent: "center",
    alignItems: "center",
  },
  photoUploadContainer: {
    alignItems: "center",
  },
  photoUploadIcon: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoImage: {
    width: 70,
    height: 70,
    tintColor: "#3B82F6",
  },
  photoUploadLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default IdentityVerificationScreen;
