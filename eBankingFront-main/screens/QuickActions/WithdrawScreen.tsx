import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Text from "../../components/Text";
import { BlurView } from "expo-blur";
import { SuccessIcon } from "../../components/LottieIcon";
import UniversalList, { ListItem } from "../../components/UniversalList";

export default function WithdrawScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedNetwork, setSelectedNetwork] = useState(
    "BNB Smart Chain(BEP20)"
  );
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [amount, setAmount] = useState("49.99");
  const [address, setAddress] = useState("176762098");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const networks = [
    {
      id: "bnb-bep20",
      name: "BNB Smart Chain (BEP20)",
      minWithdraw: "100 USDT",
      confirmations: "20 confirmation",
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      minWithdraw: "100 USDT",
      confirmations: "100 confirmation",
    },
    {
      id: "solana",
      name: "Solana",
      minWithdraw: "100 USDT",
      confirmations: "100 confirmation",
    },
    {
      id: "opbnb",
      name: "opBNB",
      minWithdraw: "100 USDT",
      confirmations: "20 confirmation",
    },
    {
      id: "ethereum",
      name: "Ethereum (ERC20)",
      minWithdraw: "100 USDT",
      confirmations: "20 confirmation",
    },
    {
      id: "tron",
      name: "Tron (TRC20)",
      minWithdraw: "100 USDT",
      confirmations: "20 confirmation",
    },
  ];

  // Convert networks to ListItem format for UniversalList
  const networkListItems: ListItem[] = networks.map((network) => ({
    id: network.id,
    title: network.name,
    subtitle: `Minimum withdrawal amount: ${network.minWithdraw}\nWithdrawal arrival: ${network.confirmations}`,
    selected: selectedNetwork === network.name,
    onPress: () => handleNetworkSelect(network.name),
  }));

  const fees = "1.00 USDC";
  const amountReceived = "48.99 USDC";

  const handleCloseReviewModal = () => {
    // Clear timeout if modal is manually closed
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowReviewModal(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNetworkSelect = (network: string) => {
    setSelectedNetwork(network);
    setShowNetworkDropdown(false);
  };

  const handleWithdraw = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmWithdraw = () => {
    setShowConfirmModal(false);
    setShowReviewModal(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Automatically hide the success message after 4 seconds
    timeoutRef.current = setTimeout(() => {
      setShowReviewModal(false);
      timeoutRef.current = null;
    }, 4000);
  };

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.statusBarBackground} />

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
          <Text style={styles.headerTitle}>Withdraw</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Network Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Network</Text>
          <LinearGradient
            colors={["rgba(59, 130, 246, 0.15)", "rgba(59, 130, 246, 0.08)"]}
            style={styles.networkSelector}
          >
            <TouchableOpacity
              style={styles.networkSelectorInner}
              onPress={() => setShowNetworkDropdown(true)}
            >
              <Text style={styles.networkText}>{selectedNetwork}</Text>
              <Ionicons name="chevron-down" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.amountInputContainer}
          >
            <View style={styles.amountInputWrapper}>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
              />
              <Text style={styles.currencyLabel}></Text>
            </View>
          </LinearGradient>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.addressLabel}>Address</Text>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.addressContainer}
          >
            <TextInput
              style={styles.addressInput}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter wallet address"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
            />
            <TouchableOpacity style={styles.qrIcon}>
              <Ionicons name="qr-code-outline" size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.copyIcon}>
              <Ionicons name="copy-outline" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Fees Section */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.03)"]}
          style={styles.feesSection}
        >
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Fees:</Text>
            <Text style={styles.feeValue}>{fees}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Amount received:</Text>
            <Text style={styles.feeValue}>{amountReceived}</Text>
          </View>
        </LinearGradient>

        {/* Spacer */}
        <View style={{ flex: 1, minHeight: 100 }} />

        {/* Withdraw Button */}
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8", "#1E40AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.withdrawButton}
        >
          <TouchableOpacity
            style={styles.withdrawButtonInner}
            onPress={handleWithdraw}
          >
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>

      {/* Network Selection Modal */}
      <Modal
        visible={showNetworkDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNetworkDropdown(false)}
      >
        <BlurView style={styles.blurOverlay} intensity={50} tint="dark">
          <TouchableOpacity
            style={styles.bottomSheetOverlay}
            activeOpacity={1}
            onPress={() => setShowNetworkDropdown(false)}
          >
            <TouchableOpacity
              style={styles.bottomSheetContainer}
              activeOpacity={1}
              onPress={() => {}}
            >
              {/* Header */}
              <View style={styles.bottomSheetHeader}>
                <Text style={styles.bottomSheetTitle}>Select Network</Text>
                <TouchableOpacity onPress={() => setShowNetworkDropdown(false)}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Network List */}
              <ScrollView
                style={styles.bottomSheetScrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.bottomSheetScrollContent}
              >
                <UniversalList
                  items={networkListItems}
                  showWarning={true}
                  warningText="Ensure the network you choose to withdraw matches the deposit network or assets may be lost."
                  warningIcon="information-circle"
                  warningColor="#F59E0B"
                />
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </BlurView>
      </Modal>

      {/* Confirm Withdrawal Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <BlurView style={styles.modalOverlay} intensity={20} tint="dark">
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowConfirmModal(false)}
          >
            <View style={styles.confirmModal}>
              <View style={styles.confirmModalHeader}>
                <Text style={styles.confirmModalTitle}>
                  Confirm the withdraw
                </Text>
                <TouchableOpacity onPress={() => setShowConfirmModal(false)}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Amount Display */}
              <LinearGradient
                colors={["rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.05)"]}
                style={styles.confirmAmountSection}
              >
                <Text style={styles.confirmCurrency}>USDC</Text>
                <Text style={styles.confirmAmount}>{amount}</Text>
              </LinearGradient>

              {/* Details Section */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsTitle}>Details</Text>

                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.05)",
                    "rgba(255, 255, 255, 0.02)",
                  ]}
                  style={styles.detailsContainer}
                >
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Fees</Text>
                    <Text style={styles.detailValue}>1.00 USDC</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Network</Text>
                    <Text style={styles.detailValue}>Solana</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Address</Text>
                    <Text style={styles.detailValueAddress}>
                      6FeroM7N7nSpeFpACqr4onGayPS3c3Qeo{"\n"}
                      XCCREByBBPF
                    </Text>
                  </View>
                </LinearGradient>

                {/* Warning Message */}
                <View style={styles.warningContainer}>
                  <Text style={styles.warningText}>
                    <Ionicons name="warning" size={14} color="#F59E0B" />{" "}
                    Digital assets are emerging asset category that contains
                    risk. Please make sure to always double-check the network
                    and address, otherwise withdraw to a wrong{"\n"}
                    network or an invalid address will cause asset losses{"\n"}
                    contract custodial service.
                  </Text>
                </View>
              </View>

              {/* Pay Button */}
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                style={styles.payButton}
              >
                <TouchableOpacity
                  style={styles.payButtonInner}
                  onPress={handleConfirmWithdraw}
                >
                  <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </BlurView>
      </Modal>

      {/* Review Modal */}
      <Modal
        visible={showReviewModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseReviewModal}
      >
        <BlurView style={styles.modalOverlay} intensity={20} tint="dark">
          <View style={styles.reviewModal}>
            <View style={styles.reviewIconContainer}>
              <View style={styles.checkmarkCircle}>
                <SuccessIcon size={40} />
              </View>
            </View>

            <Text style={styles.reviewTitle}>
              Withdrawal request submitted successfully!
            </Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    alignItems: "center",
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    opacity: 0.9,
  },
  networkSelector: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
    overflow: "hidden",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  networkSelectorInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  networkText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  amountInputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  amountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 60,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    minWidth: 100,
  },
  currencyLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
    marginLeft: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  qrIcon: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  copyIcon: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  feesSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
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
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  feeLabel: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
  },
  feeValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  withdrawButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: "auto",
    marginBottom: 20,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  withdrawButtonInner: {
    paddingVertical: 18,
    alignItems: "center",
  },
  withdrawButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  blurOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomSheetScrollContainer: {
    maxHeight: 400,
  },
  bottomSheetScrollContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  networkModal: {
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
  },
  networkModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  networkModalContent: {
    flex: 1,
  },
  networkModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  networkOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  networkOptionText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  confirmModal: {
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  confirmModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  confirmAmountSection: {
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  confirmCurrency: {
    fontSize: 14,
    color: "#3B82F6",
    marginBottom: 4,
  },
  confirmAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  detailsContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  detailValueAddress: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },
  warningContainer: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  warningText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 16,
  },
  payButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  payButtonInner: {
    paddingVertical: 16,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  reviewModal: {
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    width: "80%",
  },
  reviewIconContainer: {
    marginBottom: 24,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderWidth: 2,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 32,
  },
  reviewCloseButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  reviewCloseButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
