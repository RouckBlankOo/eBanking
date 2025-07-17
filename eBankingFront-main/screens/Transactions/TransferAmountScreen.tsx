import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NumberPad from "../../components/NumberPad";
import { SectionContainer } from "../../components/SectionContainer";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { RootStackParamList } from "../../types";
import { useAlert } from "../../context/AlertContext";

type TransferAmountRouteProps = RouteProp<RootStackParamList, "TransferAmount">;

type CurrencyType = "USDC" | "ETH" | "USD" | "TND";

export default function TransferAmountScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<TransferAmountRouteProps>();
  const { showSuccess } = useAlert(); // Add alert hook

  // Get recipient info from route params
  const { recipientType, recipientValue } = route.params || {};

  // State for the amount
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<CurrencyType>("USDC");
  const [note, setNote] = useState("");
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [tempNote, setTempNote] = useState("");

  // Currency data
  const currencies = useMemo(
    () => [
      {
        id: "USDC",
        name: "USDC",
        icon: require("@/assets/Icons/USDC.png"),
        conversionRate: 1,
      },
      {
        id: "ETH",
        name: "ETH",
        icon: require("@/assets/Icons/ETH.png"),
        conversionRate: 0.0005,
      },
      { id: "USD", name: "USD", symbol: "$", conversionRate: 1 },
      { id: "TND", name: "TND", symbol: "DT", conversionRate: 3.09 },
    ],
    []
  );

  // Format the amount for display
  const formattedAmount = useMemo(() => {
    if (!amount) return "0";

    // If amount has a decimal point
    if (amount.includes(".")) {
      const [whole, decimal] = amount.split(".");
      // Format the whole part with commas
      const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formattedWhole}.${decimal}`;
    }

    // Format without decimal
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [amount]);

  // Calculate equivalent amount in TND
  const equivalentAmount = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return "0";

    const numAmount = parseFloat(amount);
    const currentCurrency = currencies.find((c) => c.id === currency);

    if (!currentCurrency) return "0";

    const tndAmount = numAmount * currentCurrency.conversionRate * 3.09; // 3.09 TND per USD
    return tndAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [amount, currency, currencies]);

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle number press for NumberPad
  const handleNumberPress = (digit: string) => {
    // Limit to 2 decimal places
    if (amount.includes(".") && amount.split(".")[1].length >= 2) {
      return;
    }

    // Limit the length of the amount
    if (amount.length >= 10 && !amount.includes(".")) {
      return;
    }

    setAmount((prev) => prev + digit);
  };

  // Handle backspace for NumberPad
  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  // Handle decimal for NumberPad
  const handleDecimal = () => {
    if (!amount.includes(".")) {
      setAmount((prev) => prev + ".");
    }
  };

  // Handle confirm button press
  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    // Show success popup
    showSuccess(
      "Transfer Sent!",
      `${amount} ${currency} sent to ${recipientValue}${
        note ? ` with note: "${note}"` : ""
      }`,
      4000 // Show for 4 seconds
    );

    // Optional: Navigate back to previous screen after a delay
    setTimeout(() => {
      navigation.goBack();
    }, 2000);

    // Log the transfer details for debugging
    console.log("Transfer completed", {
      recipientType,
      recipientValue,
      amount,
      currency,
      note,
    });
  };

  // Handle currency selection
  const handleCurrencyChange = (selectedCurrency: CurrencyType) => {
    setCurrency(selectedCurrency);
    setShowCurrencySelector(false);
  };

  // Handle currency selector toggle
  const toggleCurrencySelector = () => {
    setShowCurrencySelector(!showCurrencySelector);
  };

  // Handle note press
  const handleNotePress = () => {
    // If we already have a note, set it as the temp note for editing
    if (note) {
      setTempNote(note);
    } else {
      setTempNote("");
    }
    setShowNoteModal(true);
  };

  // Handle save note
  const handleSaveNote = () => {
    setNote(tempNote);
    setShowNoteModal(false);
  };

  // Handle cancel note
  const handleCancelNote = () => {
    setShowNoteModal(false);
    setTempNote("");
  };

  // Get recipient display text
  const getRecipientLabel = () => {
    switch (recipientType) {
      case "phone":
        return "Phone";
      case "email":
        return "Email";
      case "uid":
        return "UID";
      default:
        return "Recipient";
    }
  };

  // Get icon for the current currency
  const getCurrentCurrencyIcon = () => {
    const currencyData = currencies.find((c) => c.id === currency);
    if (currencyData?.icon) {
      return currencyData.icon;
    }
    return null;
  };

  // Check if amount is valid
  const isAmountValid = amount !== "" && parseFloat(amount) > 0;

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />

      <View style={[styles.content, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transfer Amount</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.middleSection}>
          {/* Recipient Info */}
          <SectionContainer
            title="Recipient"
            titleOutside={true}
            containerStyle={styles.sectionContainerStyle}
            contentStyle={styles.sectionContentStyle}
          >
            <View style={styles.recipientInfo}>
              <View style={styles.recipientIconContainer}>
                <Ionicons
                  name={recipientType === "email" ? "mail" : "person"}
                  size={24}
                  color="#3B82F6"
                />
              </View>
              <View style={styles.recipientDetails}>
                <Text style={styles.recipientValue} numberOfLines={1}>
                  {recipientValue}
                </Text>
                <Text style={styles.recipientType}>{getRecipientLabel()}</Text>
              </View>
            </View>
          </SectionContainer>

          {/* Currency Selector */}
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={toggleCurrencySelector}
            activeOpacity={0.8}
          >
            {getCurrentCurrencyIcon() && (
              <View style={styles.currencyIconContainer}>
                <Ionicons
                  name={
                    currency === "USDC"
                      ? "logo-usd"
                      : currency === "ETH"
                      ? "logo-bitcoin"
                      : "cash"
                  }
                  size={20}
                  color="#3B82F6"
                />
              </View>
            )}
            <Text style={styles.currencyText}>{currency}</Text>
            <Ionicons
              name={showCurrencySelector ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Currency Dropdown if open */}
          {showCurrencySelector && (
            <View style={styles.currencyDropdown}>
              {currencies.map((curr, index) => (
                <TouchableOpacity
                  key={curr.id}
                  style={[
                    styles.currencyOption,
                    currency === curr.id && styles.currencyOptionSelected,
                    index === currencies.length - 1 &&
                      styles.lastCurrencyOption,
                  ]}
                  onPress={() => handleCurrencyChange(curr.id as CurrencyType)}
                  activeOpacity={0.8}
                >
                  <View style={styles.currencyOptionContent}>
                    <View style={styles.currencyIconContainer}>
                      <Ionicons
                        name={
                          curr.id === "USDC"
                            ? "logo-usd"
                            : curr.id === "ETH"
                            ? "logo-bitcoin"
                            : "cash"
                        }
                        size={20}
                        color="#3B82F6"
                      />
                    </View>
                    <View style={styles.currencyOptionDetails}>
                      <Text style={styles.currencyOptionTitle}>
                        {curr.name}
                      </Text>
                      <Text style={styles.currencyOptionSubtitle}>
                        Rate: {curr.conversionRate} to USD
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Amount Display */}
          <View style={styles.amountContainer}>
            <View style={styles.amountWrapper}>
              <Text style={styles.currencySymbol}>
                {currency === "USD" ? "$" : currency === "TND" ? "DT" : ""}
              </Text>
              <Text style={styles.amount}>{formattedAmount}</Text>
            </View>
            <Text style={styles.equivalentAmount}>
              ≈ {equivalentAmount} TND
            </Text>

            <TouchableOpacity
              style={[styles.addNoteButton, note ? styles.noteAdded : null]}
              onPress={handleNotePress}
            >
              <Ionicons
                name={note ? "create" : "create-outline"}
                size={16}
                color={note ? "#FFFFFF" : "#0070F3"}
                style={styles.noteIcon}
              />
              <Text
                style={[styles.addNoteText, note ? styles.noteAddedText : null]}
              >
                {note ? "Note Added (Edit)" : "Add A Note"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSection}>
          {/* NumberPad Component */}
          <NumberPad
            style={styles.keypadContainer}
            onNumberPress={handleNumberPress}
            onBackspace={handleBackspace}
            onDecimal={handleDecimal}
            showDecimal={true}
          />

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !isAmountValid && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!isAmountValid}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Note Modal */}
      <Modal
        visible={showNoteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelNote}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {note ? "Edit Note" : "Add a Note"}
              </Text>

              <TextInput
                style={styles.noteInput}
                placeholder="Enter your note here"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={tempNote}
                onChangeText={setTempNote}
                multiline={true}
                maxLength={100}
                autoFocus={true}
              />

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={handleCancelNote}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={handleSaveNote}
                >
                  <Text style={styles.modalSaveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between", // This will space elements evenly
    paddingBottom: 10, // Reduce bottom padding
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10, // Reduced from 16
    marginBottom: 5, // Reduced from 10
  },
  middleSection: {
    flex: 1,
    justifyContent: "center", // This centers the content vertically
    marginTop: -20, // Adjust as needed to center content
  },
  bottomSection: {
    marginTop: "auto", // Pushes to the bottom of the available space
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerSpacer: {
    width: 40,
  },
  sectionContainerStyle: {
    marginTop: 0,
    marginBottom: 10, // Reduced margin
  },
  sectionContentStyle: {
    height: 100, // Adjusted height for better spacing
    padding: 30,
    backgroundColor: "rgba(21, 25, 32, 0.6)",
  },
  recipientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipientIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recipientDetails: {
    flex: 1,
  },
  recipientValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  recipientType: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5, // Reduced margin
    zIndex: 10,
  },
  currencyIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 8,
  },
  currencyDropdown: {
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    alignSelf: "center",
    minWidth: 280,
    maxWidth: 320,
    zIndex: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  currencyOption: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  lastCurrencyOption: {
    marginBottom: 0,
  },
  currencyOptionSelected: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(59, 130, 246, 0.4)",
  },
  currencyOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  currencyOptionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  currencyOptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  currencyOptionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  amountContainer: {
    alignItems: "center",
    marginBottom: 16, // Reduced from 30
    marginTop: 10, // Reduced from 20
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 4,
  },
  amount: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  equivalentAmount: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 16,
  },
  addNoteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  noteAdded: {
    backgroundColor: "rgba(0, 112, 243, 0.2)",
  },
  noteIcon: {
    marginRight: 4,
  },
  addNoteText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0070F3",
  },
  noteAddedText: {
    color: "#FFFFFF",
  },
  keypadContainer: {
    marginTop: -30, // Reduced from 30
    marginBottom: 16, // Reduced from 49
    paddingHorizontal: 10, // Reduced padding
    paddingVertical: 8, // Reduced padding
    backgroundColor: "rgba(21, 25, 32, 0.8)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButton: {
    backgroundColor: "#0070F3",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10, // Reduced from 20
  },
  confirmButtonDisabled: {
    backgroundColor: "rgba(0, 112, 243, 0.5)",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Modal Styles
  modalOverlay: {
    marginTop: -120,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  noteInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: "center",
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: "#0070F3",
    borderRadius: 12,
    paddingVertical: 14,
    marginLeft: 10,
    alignItems: "center",
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
