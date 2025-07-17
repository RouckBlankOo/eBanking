import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../../components/UniversalBackground";
import Text from "../../components/Text";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import QRCode from "react-native-qrcode-svg";
import UniversalList, { ListItem } from "../../components/UniversalList";
import { BlurView } from "expo-blur";
import { useAlert } from "../../context/AlertContext";

export default function DepositScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { showSuccess, showInfo } = useAlert();

  // Get the selected currency from navigation params
  const params = route.params as any;
  const selectedCurrency = params?.currency || { symbol: "USDC", name: "USDC" };

  const [selectedNetwork, setSelectedNetwork] = useState(
    "BNB Smart Chain (BEP20)"
  );
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  // Sample deposit data
  const walletAddress = "0xF8AE81B8C1a79F4E03E560623F6214B3A7bFf1BCO";

  // Create QR code data with additional context for crypto wallets
  const getQRData = () => {
    switch (selectedNetwork) {
      case "Ethereum (ERC20)":
        return `ethereum:${walletAddress}?token=${selectedCurrency.symbol}&gas=21000`;
      case "BNB Smart Chain (BEP20)":
        return `binance:${walletAddress}?token=${selectedCurrency.symbol}`;
      case "Solana":
        return `solana:${walletAddress}?token=${selectedCurrency.symbol}`;
      case "Arbitrum":
        return `arbitrum:${walletAddress}?token=${selectedCurrency.symbol}`;
      case "Tron (TRC20)":
        return `tron:${walletAddress}?token=${selectedCurrency.symbol}`;
      case "TON":
        return `ton:${walletAddress}?token=${selectedCurrency.symbol}`;
      case "opBNB":
        return `opbnb:${walletAddress}?token=${selectedCurrency.symbol}`;
      default:
        return walletAddress; // Fallback to just the address
    }
  };

  const qrData = getQRData();

  const networks = [
    {
      name: "BNB Smart Chain (BEP20)",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "20 confirmation",
    },
    {
      name: "Arbitrum",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "100 confirmation",
    },
    {
      name: "Solana",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "100 confirmation",
    },
    {
      name: "opBNB",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "1 confirmation",
    },
    {
      name: "Tron (TRC20)",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "5 confirmation",
    },
    {
      name: "Ethereum (ERC20)",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "64 confirmation",
    },
    {
      name: "TON",
      minDeposit: `100 ${selectedCurrency.symbol}`,
      confirmations: "5 confirmation",
    },
  ];

  // Convert networks to ListItem format for UniversalList
  const networkListItems: ListItem[] = networks.map((network, index) => ({
    id: `network-${index}`,
    title: network.name,
    subtitle: `Minimum deposit amount: ${network.minDeposit}\nDeposit arrival: ${network.confirmations}`,
    selected: selectedNetwork === network.name,
    onPress: () => handleNetworkSelect(network.name),
  }));

  const depositInfo = {
    network: selectedNetwork,
    minimumDeposit: `1.00 ${selectedCurrency.symbol}`,
    contractAddress: "***97955",
  };

  const handleCopyAddress = async () => {
    try {
      // Try to use expo-clipboard if available
      const { setStringAsync } = await import("expo-clipboard");
      await setStringAsync(walletAddress);
      showSuccess("Copied!", "Address copied to clipboard", 2000);
    } catch {
      // Fallback: just show a success message
      showSuccess("Copied!", "Address copied to clipboard", 2000);
    }
  };

  const handleShare = () => {
    showInfo(
      "Share",
      `Sharing deposit information for ${selectedCurrency.symbol}`
    );
  };

  const handleNetworkSelect = (networkName: string) => {
    setSelectedNetwork(networkName);
    setShowNetworkDropdown(false);
  };

  const handleDepositComplete = () => {
    // Simulate successful deposit completion
    showSuccess(
      "Deposit Successful!",
      `${selectedCurrency.symbol} deposit processed. Funds will be available shortly`,
      4000 // Show for 4 seconds
    );
  };

  return (
    <OnboardingBackground style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Deposit {selectedCurrency.symbol}
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Network Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Network</Text>
            <TouchableOpacity
              style={styles.networkSelector}
              onPress={() => setShowNetworkDropdown(!showNetworkDropdown)}
            >
              <Text style={styles.networkText}>{selectedNetwork}</Text>
              <Ionicons
                name={showNetworkDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {showNetworkDropdown && (
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
                        <Text style={styles.bottomSheetTitle}>
                          Select Network
                        </Text>
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
                          warningText="Ensure the network you choose to deposit matches the withdrawal network or assets may be lost."
                          warningIcon="information-circle"
                          warningColor="#F59E0B"
                        />
                      </ScrollView>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </BlurView>
              </Modal>
            )}
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCode}>
              <QRCode
                value={qrData}
                size={200}
                color="black"
                backgroundColor="white"
                logo={{
                  uri: undefined, // We'll use overlay icon instead
                }}
                logoSize={30}
                logoBackgroundColor="transparent"
              />
              {/* Currency Icon overlay */}
              <View style={styles.qrCenterIcon}>
                <View style={styles.qrIconBackground}>
                  {selectedCurrency.icon ? (
                    <Image
                      source={selectedCurrency.icon}
                      style={styles.currencyIcon}
                      resizeMode="contain"
                    />
                  ) : (
                    <Ionicons name="logo-usd" size={24} color="#3B82F6" />
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Wallet Address */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{walletAddress}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyAddress}
            >
              <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Deposit Information */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Deposit network</Text>
              <Text style={styles.infoValue}>{depositInfo.network}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Minimum deposit</Text>
              <Text style={styles.infoValue}>{depositInfo.minimumDeposit}</Text>
            </View>
            <View style={[styles.infoRow, styles.lastInfoRow]}>
              <Text style={styles.infoLabel}>Contract Address</Text>
              <Text style={styles.infoValue}>
                {depositInfo.contractAddress}
              </Text>
            </View>
          </View>

          {/* Warning */}
          <View style={styles.warningContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#F59E0B"
            />
            <Text style={styles.warningText}>
              The current address only supports depositing{" "}
              {selectedCurrency.symbol} on {selectedNetwork}, depositing other
              assets will result in loss
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>

            {/* Simulate Deposit Complete Button - Remove in production */}
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleDepositComplete}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.completeButtonText}>Simulate Complete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    paddingVertical: 16,
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  networkSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    minHeight: 48,
  },
  networkText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  qrCenterIcon: {
    position: "absolute",
    width: 30,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000FF",
  },
  qrIconBackground: {
    width: 36,
    height: 36,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  currencyIcon: {
    width: 32,
    height: 32,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "monospace",
  },
  copyButton: {
    marginLeft: 12,
    padding: 8,
  },
  infoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  infoValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: "#F59E0B",
    marginLeft: 12,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingVertical: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 12,
  },
  shareButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  completeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    height: "90%",
  },
  fullScreenModal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    marginBottom: 24,
  },
  modalBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  modalHeaderRight: {
    width: 40,
  },
  modalWarningContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  modalWarningText: {
    flex: 1,
    fontSize: 14,
    color: "#F59E0B",
    lineHeight: 20,
  },
  networkScrollContainer: {
    flex: 1,
  },
  networkScrollContent: {
    paddingBottom: 40,
  },
  networkItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  networkItemContent: {
    flex: 1,
  },
  networkItemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  networkItemDetail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  networkCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  networkCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  networkCardSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  // Bottom Sheet Styles
  blurOverlay: {
    flex: 1,
  },
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  bottomSheetContainer: {
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  bottomSheetHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  bottomSheetWarning: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  bottomSheetWarningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  bottomSheetWarningText: {
    flex: 1,
    fontSize: 14,
    color: "#F59E0B",
    lineHeight: 20,
  },
  bottomSheetScrollContainer: {
    maxHeight: 450,
  },
  bottomSheetScrollContent: {
    paddingBottom: 20,
  },
  bottomSheetNetworkItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  bottomSheetNetworkTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bottomSheetNetworkSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
});
