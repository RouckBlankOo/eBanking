import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Text from "../components/Text";
import { useUser } from "../context/UserContext";
import { useAlert } from "../context/AlertContext";

type CardCustomizationRouteProp = RouteProp<
  RootStackParamList,
  "CardCustomization"
>;

export default function CardCustomizationScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<CardCustomizationRouteProp>();
  const { cardType } = route.params;
  const { addCard } = useUser();
  const { showSuccess, showError } = useAlert();

  const [selectedGradient, setSelectedGradient] = useState(0);
  const [cardName, setCardName] = useState(
    cardType === "virtual" ? "VIRTUAL CARD" : "PREMIUM CARD"
  );
  const [customCardName, setCustomCardName] = useState("");
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [showCustomGradient, setShowCustomGradient] = useState(false);
  const [customGradient, setCustomGradient] = useState({
    color1: cardType === "virtual" ? "#8B7CF6" : "#F59E0B",
    color2: cardType === "virtual" ? "#6366F1" : "#D97706",
  });
  const [showNameInput, setShowNameInput] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveCard = () => {
    // Generate a random card number for demonstration
    const generateCardNumber = () => {
      const randomDigits = () => Math.floor(1000 + Math.random() * 9000);
      return `•••• •••• •••• ${randomDigits().toString().slice(-4)}`;
    };

    // Create the new card object
    const newCard = {
      type: cardType === "virtual" ? "Virtual Card" : "Premium Card",
      name: cardName,
      balance: "0.00",
      cardNumber: generateCardNumber(),
      gradient: getCurrentGradient(),
      isFrozen: false,
      isInfoHidden: false,
      limit: cardType === "virtual" ? 500 : 2000,
      cardType: cardType,
      pattern: cardType === "premium" ? selectedPattern : undefined,
    };

    // Add the card to the context
    addCard(newCard);

    showSuccess(
      "Card Created",
      `${cardType} card "${cardName}" created successfully!`,
      3000
    );

    // Navigate back to the cards screen after showing success
    setTimeout(() => {
      navigation.navigate("MainApp");
    }, 3000); // Wait for success alert to auto-close
  };

  const handleCustomNameSave = () => {
    if (customCardName.trim()) {
      const processedName = customCardName.trim().toUpperCase();
      setCardName(processedName);
      setShowNameInput(false);
      setCustomCardName("");
    } else {
      showError("Invalid Name", "Please enter a valid card name.");
    }
  };

  const handleCustomGradientSave = () => {
    setSelectedGradient(-1); // -1 indicates custom gradient
    setShowCustomGradient(false);
  };

  const getCurrentGradient = () => {
    if (selectedGradient === -1) {
      return [customGradient.color1, customGradient.color2];
    }
    return gradientOptions[selectedGradient].colors;
  };

  const gradientOptions =
    cardType === "virtual"
      ? [
          // Basic colors for Virtual Card
          {
            id: 0,
            name: "Purple",
            colors: ["#8B7CF6", "#6366F1"],
          },
          {
            id: 1,
            name: "Blue",
            colors: ["#3B82F6", "#1E40AF"],
          },
          {
            id: 2,
            name: "Green",
            colors: ["#10B981", "#059669"],
          },
          {
            id: 3,
            name: "Pink",
            colors: ["#EC4899", "#BE185D"],
          },
          {
            id: 4,
            name: "Gray",
            colors: ["#64748B", "#334155"],
          },
        ]
      : [
          // Full gradient options for Premium Card
          {
            id: 0,
            name: "Purple Dream",
            colors: ["#8B7CF6", "#6366F1"],
          },
          {
            id: 1,
            name: "Ocean Blue",
            colors: ["#3B82F6", "#1E40AF"],
          },
          {
            id: 2,
            name: "Sunset Orange",
            colors: ["#F59E0B", "#EA580C"],
          },
          {
            id: 3,
            name: "Forest Green",
            colors: ["#10B981", "#059669"],
          },
          {
            id: 4,
            name: "Rose Pink",
            colors: ["#EC4899", "#BE185D"],
          },
          {
            id: 5,
            name: "Dark Steel",
            colors: ["#64748B", "#334155"],
          },
          {
            id: 6,
            name: "Custom",
            colors: ["#F59E0B", "#D97706"], // Default, will be overridden
            isCustom: true,
          },
        ];

  const patternOptions = [
    {
      id: 0,
      name: "Circles",
      component: (
        <>
          <View style={[styles.patternCircle1, { opacity: 0.3 }]} />
          <View style={[styles.patternCircle2, { opacity: 0.2 }]} />
        </>
      ),
    },
    {
      id: 1,
      name: "Waves",
      component: (
        <>
          <View style={[styles.patternWave1]} />
          <View style={[styles.patternWave2]} />
        </>
      ),
    },
    {
      id: 2,
      name: "Minimal",
      component: <View style={[styles.patternMinimal]} />,
    },
  ];

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 1 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Customize {cardType === "virtual" ? "Virtual" : "Premium"} Card
          </Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Card Preview */}
        <View style={styles.cardPreviewContainer}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={getCurrentGradient() as [string, string]}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Visa Logo */}
              <View style={styles.cardHeader}>
                <Text style={styles.visaLogo}>VISA</Text>
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <Text style={styles.appName}>{cardName}</Text>
              </View>

              {/* Card Background Pattern - Only for Premium */}
              {cardType === "premium" && (
                <View style={styles.cardPattern}>
                  {patternOptions[selectedPattern].component}
                </View>
              )}
            </LinearGradient>
          </View>
        </View>

        {/* Card Name Section */}
        <View style={styles.customizationSection}>
          <Text style={styles.sectionTitle}>Card Name</Text>
          <TouchableOpacity
            style={styles.customNameInput}
            onPress={() => setShowNameInput(true)}
          >
            <View style={styles.customNameContent}>
              <Text style={styles.currentCardName}>{cardName}</Text>
              <Ionicons name="create-outline" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.customNameHint}>
              Tap to customize your card name
            </Text>
          </TouchableOpacity>
        </View>

        {/* Color Gradients Section */}
        <View style={styles.customizationSection}>
          <Text style={styles.sectionTitle}>
            {cardType === "virtual" ? "Card Colors" : "Color Theme"}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.gradientScrollView}
            contentContainerStyle={styles.gradientContainer}
          >
            {gradientOptions.map((gradient, index) => (
              <TouchableOpacity
                key={gradient.id}
                style={[
                  styles.gradientOption,
                  selectedGradient === index && styles.selectedGradientOption,
                  selectedGradient === -1 &&
                    gradient.isCustom &&
                    styles.selectedGradientOption,
                ]}
                onPress={() => {
                  if (gradient.isCustom) {
                    setShowCustomGradient(true);
                  } else {
                    setSelectedGradient(index);
                  }
                }}
              >
                <LinearGradient
                  colors={
                    gradient.isCustom && selectedGradient === -1
                      ? [customGradient.color1, customGradient.color2]
                      : (gradient.colors as [string, string])
                  }
                  style={styles.gradientPreview}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {gradient.isCustom && (
                    <View style={styles.customGradientIcon}>
                      <Ionicons name="create-outline" size={16} color="white" />
                    </View>
                  )}
                </LinearGradient>
                <Text style={styles.gradientName}>{gradient.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pattern Section - Only for Premium Cards */}
        {cardType === "premium" && (
          <View style={styles.customizationSection}>
            <Text style={styles.sectionTitle}>Background Pattern</Text>
            <View style={styles.patternContainer}>
              {patternOptions.map((pattern, index) => (
                <TouchableOpacity
                  key={pattern.id}
                  style={[
                    styles.patternOption,
                    selectedPattern === index && styles.selectedPatternOption,
                  ]}
                  onPress={() => setSelectedPattern(index)}
                >
                  <View style={styles.patternPreview}>
                    <LinearGradient
                      colors={getCurrentGradient() as [string, string]}
                      style={styles.patternPreviewGradient}
                    >
                      <View style={styles.miniPattern}>
                        {pattern.component}
                      </View>
                    </LinearGradient>
                  </View>
                  <Text style={styles.patternName}>{pattern.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={handleSaveCard}>
          <LinearGradient
            colors={["#3B82F6", "#2563EB"]}
            style={styles.applyGradient}
          >
            <Text style={styles.applyButtonText}>Apply Customization</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Name Input Modal */}
      <Modal
        visible={showNameInput}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNameInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Custom Name</Text>
            <TextInput
              style={styles.nameInput}
              value={customCardName}
              onChangeText={setCustomCardName}
              placeholder={`Enter ${cardType} card name (max 12 chars)`}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              maxLength={12}
              autoCapitalize="characters"
              autoFocus={true}
            />
            <View style={styles.characterCounter}>
              <Text style={styles.characterCounterText}>
                {customCardName.length}/12 characters
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowNameInput(false);
                  setCustomCardName("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={handleCustomNameSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Gradient Modal - Only for Premium */}
      {cardType === "premium" && (
        <Modal
          visible={showCustomGradient}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCustomGradient(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create Custom Gradient</Text>

              {/* Gradient Preview */}
              <View style={styles.gradientPreviewContainer}>
                <LinearGradient
                  colors={[customGradient.color1, customGradient.color2]}
                  style={styles.largeGradientPreview}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </View>

              {/* Color Pickers */}
              <View style={styles.colorPickersContainer}>
                <View style={styles.colorPickerSection}>
                  <Text style={styles.colorLabel}>First Color</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.colorOptions}>
                      {[
                        "#8B7CF6",
                        "#3B82F6",
                        "#F59E0B",
                        "#10B981",
                        "#EC4899",
                        "#64748B",
                        "#EF4444",
                        "#8B5CF6",
                        "#06B6D4",
                        "#84CC16",
                        "#F97316",
                        "#A855F7",
                        "#14B8A6",
                        "#F472B6",
                        "#6366F1",
                      ].map((color, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.colorOption,
                            { backgroundColor: color },
                            customGradient.color1 === color &&
                              styles.selectedColorOption,
                          ]}
                          onPress={() =>
                            setCustomGradient((prev) => ({
                              ...prev,
                              color1: color,
                            }))
                          }
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View style={styles.colorPickerSection}>
                  <Text style={styles.colorLabel}>Second Color</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.colorOptions}>
                      {[
                        "#6366F1",
                        "#1E40AF",
                        "#EA580C",
                        "#059669",
                        "#BE185D",
                        "#334155",
                        "#DC2626",
                        "#7C3AED",
                        "#0891B2",
                        "#65A30D",
                        "#EA580C",
                        "#9333EA",
                        "#0D9488",
                        "#DB2777",
                        "#4F46E5",
                      ].map((color, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.colorOption,
                            { backgroundColor: color },
                            customGradient.color2 === color &&
                              styles.selectedColorOption,
                          ]}
                          onPress={() =>
                            setCustomGradient((prev) => ({
                              ...prev,
                              color2: color,
                            }))
                          }
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowCustomGradient(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSaveButton]}
                  onPress={handleCustomGradientSave}
                >
                  <Text style={styles.saveButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
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
    textAlign: "center",
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardPreviewContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  cardContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  card: {
    width: "100%",
    aspectRatio: 1.586,
    borderRadius: 16,
    padding: 20,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardHeader: {
    alignItems: "flex-end",
  },
  visaLogo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  cardPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternCircle1: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -20,
    right: -20,
  },
  patternCircle2: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    bottom: -15,
    left: -15,
  },
  patternWave1: {
    position: "absolute",
    width: 100,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: 30,
    right: -20,
    transform: [{ rotate: "45deg" }],
  },
  patternWave2: {
    position: "absolute",
    width: 80,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: 40,
    left: -10,
    transform: [{ rotate: "-30deg" }],
  },
  patternMinimal: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    top: 20,
    right: 20,
  },
  customizationSection: {
    marginBottom: 30,
  },
  customNameInput: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
  },
  customNameContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  currentCardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  customNameHint: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontStyle: "italic",
  },
  gradientScrollView: {
    maxHeight: 120,
  },
  gradientContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  gradientOption: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedGradientOption: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  gradientPreview: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginBottom: 6,
  },
  gradientName: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    textAlign: "center",
  },
  customGradientIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  patternContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
  },
  patternOption: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPatternOption: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  patternPreview: {
    width: 60,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  patternPreviewGradient: {
    flex: 1,
    position: "relative",
  },
  miniPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternName: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    textAlign: "center",
  },
  applyButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
  },
  applyGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  nameInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    marginBottom: 8,
  },
  characterCounter: {
    alignItems: "center",
    marginBottom: 20,
  },
  characterCounterText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
  },
  modalSaveButton: {
    backgroundColor: "#3B82F6",
  },
  // Gradient Modal Styles
  gradientPreviewContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  largeGradientPreview: {
    width: 200,
    height: 120,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  colorPickersContainer: {
    marginBottom: 24,
  },
  colorPickerSection: {
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 4,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "transparent",
  },
  selectedColorOption: {
    borderColor: "#FFFFFF",
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});
