import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import Text from "../components/Text";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { RootStackParamList } from "../types";
import { useAlert } from "../context/AlertContext";
import UniversalList, { ListItem } from "../components/UniversalList";

export default function BankTransferDetailsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { showSuccess } = useAlert(); // Add alert hook

  // Get the amount and currency from navigation params
  const params = route.params as any;
  const amount = params?.amount || "100";
  const currency = params?.currency || "TND";
  const usdcAmount = params?.usdcAmount || "28.57";

  const [ribNumber, setRibNumber] = useState("000****0000");
  const [selectedBank, setSelectedBank] = useState("Biat");
  const [showBankModal, setShowBankModal] = useState(false);
  const [conditionText, setConditionText] = useState(
    "Lorem ipsum is simply dummy text of the printing and typesetting industry."
  );
  const [note, setNote] = useState("");

  // List of Tunisian banks
  const banks = [
    { id: 1, name: "Biat", fullName: "Banque Internationale Arabe de Tunisie" },
    { id: 2, name: "BFPME", fullName: "Banque de Financement des PME" },
    { id: 3, name: "BNA", fullName: "Banque Nationale Agricole" },
    { id: 4, name: "BH Bank", fullName: "Banque de l'Habitat" },
    { id: 5, name: "STB", fullName: "Société Tunisienne de Banque" },
    { id: 6, name: "UIB", fullName: "Union Internationale de Banques" },
    {
      id: 7,
      name: "UBCI",
      fullName: "Union Bancaire pour le Commerce et l'Industrie",
    },
    { id: 8, name: "ATB", fullName: "Arab Tunisian Bank" },
    { id: 9, name: "Amen Bank", fullName: "Amen Bank" },
    { id: 10, name: "ABC Bank", fullName: "Arab Banking Corporation" },
    { id: 11, name: "Attijari Bank", fullName: "Attijari Bank Tunisia" },
    { id: 12, name: "Zitouna Bank", fullName: "Zitouna Bank" },
  ];

  // Convert banks to list items for UniversalList
  const bankListItems: ListItem[] = banks.map((bank) => ({
    id: bank.id.toString(),
    title: bank.name,
    subtitle: bank.fullName,
    icon: "business",
    onPress: () => handleBankSelect(bank.name),
    selected: selectedBank === bank.name,
  }));

  const handleSave = () => {
    // Simulate successful bank transfer save
    showSuccess(
      "Transfer Saved!",
      `${amount} ${currency} transfer request saved and will be processed shortly`,
      4000 // Show for 4 seconds
    );

    // Optional: Navigate back or to a confirmation screen
    // navigation.goBack();
  };

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setShowBankModal(false);
  };

  const handleAddPhoto = () => {
    // TODO: Implement photo picker
    console.log("Add photo functionality");
  };

  return (
    <OnboardingBackground style={styles.container}>
      <ScrollView
        style={[
          styles.content,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bank transfer</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountValue}>
            {amount} {currency}
          </Text>
          <Text style={styles.usdcEquivalent}>≈ {usdcAmount} USDC</Text>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle" size={16} color="#3B82F6" />
            <Text style={styles.infoText}>
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
        </View>

        {/* RIB Section */}
        <View style={styles.section}>
          <View style={styles.ribContainer}>
            <View style={styles.ribHeader}>
              <Text style={styles.sectionTitle}>RIB</Text>
              <TouchableOpacity
                style={styles.bankInfo}
                onPress={() => setShowBankModal(true)}
              >
                <View style={styles.bankIcon}></View>
                <Text style={styles.bankName}>{selectedBank}</Text>
                <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.ribInput}
              value={ribNumber}
              onChangeText={setRibNumber}
              placeholder="000****0000"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>

        {/* Condition Section */}
        <View style={styles.section}>
          <View style={styles.conditionContainer}>
            <Text style={styles.sectionTitle}>Condition</Text>
            <TextInput
              style={styles.conditionInput}
              value={conditionText}
              onChangeText={setConditionText}
              multiline={true}
              numberOfLines={3}
              placeholder="Enter conditions"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>

        {/* Add Photo Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.addPhotoContainer}
            onPress={handleAddPhoto}
          >
            <View style={styles.addPhotoButton}>
              <Image
                source={require("../assets/Icons/Camera.png")}
                style={styles.addPhotoIcon}
              />
            </View>
            <Text style={styles.addPhotoText}>Add Photo</Text>
            <View style={styles.infoRow}>
              <Ionicons name="information-circle" size={16} color="#3B82F6" />
              <Text style={styles.infoText}>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Note Section */}
        <View style={styles.section}>
          <View style={styles.noteContainer}>
            <Text style={styles.sectionTitle}>Note</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Add note"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Bank Selection Modal */}
      <Modal
        visible={showBankModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBankModal(false)}
      >
        <BlurView intensity={20} style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowBankModal(false)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <UniversalList
              items={bankListItems}
              containerStyle={styles.bankList}
            />
          </View>
        </BlurView>
      </Modal>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerRight: {
    width: 40,
  },
  amountSection: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    textAlign: "center",
  },
  usdcEquivalent: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 12,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 12,
  },
  ribContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
  },
  ribHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ribInput: {
    fontSize: 16,
    color: "#FFFFFF",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  bankSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  bankInfo: {
    width: "40%",
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  bankIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  bankIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bankName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 8,
  },
  conditionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
  },
  conditionInput: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlignVertical: "top",
    minHeight: 60,
  },
  addPhotoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  addPhotoButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderStyle: "dashed",
  },
  addPhotoIcon: {
    width: 20,
    height: 20,
    tintColor: "#3B82F6",
  },
  addPhotoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  noteContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
  },
  noteInput: {
    fontSize: 14,
    color: "#FFFFFF",
    paddingVertical: 8,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    paddingBottom: 50,
    backgroundColor: "transparent",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "rgba(20, 25, 45, 0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  closeButton: {
    padding: 4,
  },
  bankList: {
    padding: 20,
  },
  bankItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedBankItem: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  bankItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  bankItemIcon: {
    width: 24,
    height: 24,
    tintColor: "#3B82F6",
  },
  bankItemInfo: {
    flex: 1,
  },
  bankItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  bankItemFullName: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
