import { ThemedText } from "@/components/ThemedText";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
// Import reusable components
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionButton } from "../components/ActionButton";
import { AnalyticsChart } from "../components/AnalyticsChart";
import { CurrencyCard } from "../components/CurrencyCard";
import { DiscountsContent } from "../components/DiscountsContent";
import { EmptyState } from "../components/EmptyState";
import MoreOptionsModal, { MoreOption } from "../components/MoreOptionsModal";
import { ReferenceCard } from "../components/ReferenceCard";
import { SectionContainer } from "../components/SectionContainer";
import Text from "../components/Text";
import { UserHeader } from "../components/UserHeader";
import { VerificationBanner } from "../components/VerificationBanner";
import { useAlert } from "../context/AlertContext";
import { RootStackParamList } from "../types";

const { width: screenWidth } = Dimensions.get("window");

// Function to get responsive font size for balance amount
const getBalanceFontSize = () => {
  if (screenWidth < 350) return 36; // Small screens
  if (screenWidth < 400) return 40; // Medium screens
  return 44; // Large screens
};

// Function to get font size based on balance length
const getBalanceFontSizeByLength = (balanceText: string) => {
  const baseFontSize = getBalanceFontSize();
  if (balanceText.length > 12) return baseFontSize * 0.7; // Very long numbers
  if (balanceText.length > 8) return baseFontSize * 0.85; // Long numbers
  return baseFontSize; // Normal length
};

interface CurrencyCardData {
  id: string;
  symbol: string;
  iconSource: any;
  name: string;
  balance: string;
  percentage: string;
  coinType: string;
}

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: "Declined" | "Completed" | "Pending";
  date: string;
}

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { isProfileComplete } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { showInfo } = useAlert();

  // State for more options modal
  const [moreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false);

  // State for identity verification - check if profile is complete
  const profileComplete = isProfileComplete();

  // Function to handle profile press
  const handleProfilePress = () => {
    navigation.navigate("ProfileScreen");
  };

  // Function to handle action button presses
  const handleActionPress = (actionName: string) => {
    // Check if profile is complete
    if (!isProfileComplete()) {
      // Navigate to SecurityVerificationScreen with the action name
      navigation.navigate("SecurityVerification", { actionName });
    } else {
      // Handle the actual action (deposit, send, etc.)
      if (actionName === "more") {
        // Show more options modal when More button is pressed
        setMoreOptionsModalVisible(true);
      } else if (actionName === "deposit") {
        // Navigate to Select Currency screen for deposit
        navigation.navigate("SelectCurrency");
      } else if (actionName === "send") {
        // Navigate to Send screen
        navigation.navigate("Send");
      } else {
        console.log(`Performing action: ${actionName}`);
        // TODO: Implement actual action handling for other actions
      }
    }
  };

  // Function to handle card actions
  const handleCardAction = (actionName: string) => {
    console.log(`Performing ${actionName} action`);

    // Check if profile is complete for certain actions
    if (!isProfileComplete()) {
      navigation.navigate("SecurityVerification", { actionName });
      return;
    }

    // Handle specific actions
    switch (actionName) {
      case "convert":
        // Navigate to conversion screen
        navigation.navigate("Convert");
        break;
      case "withdraw":
        // Navigate to withdrawal screen
        navigation.navigate("Withdraw");
        break;
      case "scan":
        // TODO: Open QR scanner
        showInfo("Scan QR Code", "Scan QR code to send or receive funds");
        break;
      case "gift":
        // TODO: Navigate to gift screen
        showInfo("Gift", "Send cryptocurrency as a gift to someone");
        break;
      default:
        break;
    }
  };

  // Function to handle crypto currency card navigation
  const handleCryptoCardPress = (coinType: string) => {
    if (!isProfileComplete()) {
      // Navigate to profile completion if profile is not complete
      navigation.navigate("PersonalInformation");
    } else {
      // Navigate to coin wallet if profile is complete
      navigation.navigate("CoinWalletScreen", { coinType });
    }
  };

  // Define card actions for more options modal
  const homeMoreOptions: MoreOption[] = [
    {
      id: "convert",
      title: "Convert",
      description: "Exchange between currencies",
      icon: "swap-horizontal-outline",
      iconSource: require("@/assets/Icons/Convert.png"),
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: () => handleCardAction("convert"),
    },
    {
      id: "withdraw",
      title: "Withdraw",
      description: "Transfer funds to your bank",
      icon: "arrow-up-outline",
      iconSource: require("@/assets/Icons/Withdraw.png"),
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: () => handleCardAction("withdraw"),
    },
    {
      id: "scan",
      title: "Scan QR Code",
      description: "Quick payments and transfers",
      icon: "qr-code-outline",
      iconSource: require("@/assets/Icons/Scan.png"),
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: () => handleCardAction("scan"),
    },
    {
      id: "gift",
      title: "Gift",
      description: "Send money to friends and family",
      icon: "gift-outline",
      iconSource: require("@/assets/Icons/Gift.png"),
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: () => handleCardAction("gift"),
    },
  ];

  // Current balance and currency
  const currentBalance = "0.00"; // Will display properly without cutoff
  const currency = "¥";
  const currencyName = "CNY";

  // Empty data for new user
  const currencyCards: CurrencyCardData[] = [
    {
      id: "1",
      symbol: "💎",
      iconSource: require("@/assets/Icons/USDC.png"),
      name: "USDC",
      balance: "0.00",
      percentage: "0%",
      coinType: "USDC",
    },
    {
      id: "2",
      symbol: "₿",
      iconSource: require("@/assets/Icons/Binances.png"), // Crypto exchange logo for BTC
      name: "BTC",
      balance: "0.00",
      percentage: "0%",
      coinType: "BTC",
    },
    {
      id: "3",
      symbol: "⟠",
      iconSource: require("@/assets/Icons/ETH.png"),
      name: "ETH",
      balance: "0.00",
      percentage: "0%",
      coinType: "ETH",
    },
  ];

  // Empty transactions for new user
  const transactions: Transaction[] = [];

  const renderCurrencyCard = ({ item }: { item: CurrencyCardData }) => (
    <CurrencyCard
      symbol={item.symbol}
      iconSource={item.iconSource}
      name={item.name}
      balance={item.balance}
      percentage={item.percentage}
      onPress={() => handleCryptoCardPress(item.coinType)}
    />
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <ThemedText style={styles.transactionTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.transactionSubtitle}>
          {item.subtitle}
        </ThemedText>
        <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
      </View>
      <View style={styles.transactionRight}>
        <ThemedText style={styles.transactionAmount}>{item.amount}</ThemedText>
        <ThemedText
          style={[
            styles.transactionStatus,
            item.status === "Declined" && styles.transactionStatusDeclined,
          ]}
        >
          {item.status}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: insets.top - 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <UserHeader
            greetingText="Welcome back!"
            useProfileImage={true}
            avatarSize={65}
            onProfilePress={handleProfilePress}
          />
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
              <View style={styles.notificationBadge}>
                <ThemedText style={styles.notificationCount}>5</ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Verification Banner */}
        {!profileComplete && (
          <VerificationBanner
            onVerifyPress={() => {
              // Navigate to Personal Information screen to start verification
              navigation.navigate("PersonalInformation");
            }}
          />
        )}

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceAmountContainer}>
              {/* Balance amount with responsive font sizing and auto-fit to prevent cutoff */}
              <Text
                style={[
                  styles.balanceAmount,
                  {
                    fontSize: getBalanceFontSizeByLength(
                      `${currency}${currentBalance}`
                    ),
                  },
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                minimumFontScale={0.6}
              >
                {currency}
                {currentBalance}
              </Text>
            </View>
            <ThemedText style={styles.balanceLabel}>
              Est. Total Value ({currencyName})
            </ThemedText>
            <View style={styles.balanceFooter}>
              <ThemedText style={styles.balanceSubtext}>
                Available Balance
              </ThemedText>
              <TouchableOpacity style={styles.eyeButton}>
                <Ionicons
                  name="eye-outline"
                  size={16}
                  color="rgba(255, 255, 255, 0.6)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <ActionButton
            title="Deposit"
            iconSource={require("@/assets/Icons/Deposit.png")}
            onPress={() => handleActionPress("deposit")}
          />
          <ActionButton
            title="Send"
            iconSource={require("@/assets/Icons/Flesh.png")}
            onPress={() => handleActionPress("send")}
          />
          <ActionButton
            title="More"
            iconSource={require("@/assets/Icons/More.png")}
            onPress={() => handleActionPress("more")}
          />
        </View>

        {/* Currency Cards */}
        <FlatList
          data={currencyCards}
          renderItem={renderCurrencyCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.currencyCardsContainer}
          style={styles.currencyCardsList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          snapToInterval={(screenWidth - 60) / 3 + 12} // Card width + separator
          decelerationRate="fast"
          bounces={false}
        />

        {/* Transactions Section */}
        <SectionContainer
          title="Transactions"
          containerStyle={styles.transactionsSection}
          contentStyle={styles.transactionsContainer}
        >
          {transactions.length === 0 ? (
            <EmptyState message="Nothing Yet" />
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </SectionContainer>

        {/* Learn Section */}
        <SectionContainer title="Learn" titleOutside={true}>
          <ReferenceCard />
        </SectionContainer>

        {/* Analytics Section */}
        <SectionContainer title="Analytics" titleOutside={true}>
          <AnalyticsChart />
        </SectionContainer>

        {/* Unlock Discounts Section */}
        <SectionContainer title="Unlock discounts with..." titleOutside={true}>
          <DiscountsContent />
        </SectionContainer>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* More Options Modal */}
      <MoreOptionsModal
        visible={moreOptionsModalVisible}
        onClose={() => setMoreOptionsModalVisible(false)}
        options={homeMoreOptions}
        title="Quick Actions"
        subtitle="Choose an action to perform"
        headerIcon="ellipsis-horizontal"
        headerIconColor="#3B82F6"
      />
    </OnboardingBackground>
  );
};

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  greetingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
    marginRight: 16,
  },
  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 8,
  },
  balanceCard: {
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    minHeight: 180,
  },
  balanceAmountContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 12,
    minHeight: 70,
    maxHeight: 80,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  balanceAmount: {
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -1,
    includeFontPadding: false,
    textAlignVertical: "center",
    width: "100%",
    flexShrink: 1,
    overflow: "visible",
  },
  balanceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 8,
  },
  balanceSubtext: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
  },
  eyeButton: {
    padding: 8,
    borderRadius: 6,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  currencyCardsList: {
    marginBottom: 32,
  },
  currencyCardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  currencyCard: {
    width: (screenWidth - 60) / 3, // Responsive width: (screen width - padding) / 3 cards
    minWidth: 110, // Minimum width to prevent cards from being too small
    height: 120,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 12,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currencyCardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  currencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  currencyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  currencyIcon: {
    width: 24,
    height: 24,
  },
  currencyName: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    flex: 1,
  },
  currencyBalance: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 6,
  },
  currencyFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currencyPercentage: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  percentageIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  transactionsSection: {
    flex: 1,
  },
  transactionsContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  sectionTitleInside: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  transactionLeft: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  transactionStatusDeclined: {
    color: "#EF4444",
  },
  emptyTransactionsContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
    flex: 1,
    padding: 20,
  },
  emptyTransactionState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTransactionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTransactionText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    textAlign: "center",
  },
  emptyTransactionSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  additionalSection: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  additionalSectionContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    minHeight: 100,
  },
  emptyAdditionalState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
  },
  emptyAdditionalText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    textAlign: "center",
  },
  // Reference Card Styles
  referenceCard: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  referenceContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  referenceLeft: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 8,
  },
  referenceDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  referenceRight: {
    marginLeft: 16,
  },
  referenceIllustration: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: 60,
    height: 50,
  },
  phoneIcon: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    padding: 6,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneText: {
    fontSize: 18,
  },
  handIcon: {
    position: "absolute",
    right: -12,
    top: -5,
    zIndex: 1,
  },
  handText: {
    fontSize: 22,
  },
  referenceImage: {
    paddingRight: 12,
    width: 90,
    height: 90,
  },
  // Chart Styles
  chartContainer: {
    height: 180,
    flexDirection: "row",
    paddingVertical: 10,
  },
  yAxisLabels: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 12,
    width: 35,
    height: 140,
  },
  chartArea: {
    flex: 1,
  },
  chartGrid: {
    height: 140,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  gridLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    width: "100%",
  },
  chartEmptyState: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  chartEmptyText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500",
  },
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  axisLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
  },
  // Simplified Analytics Styles
  analyticsEmptyContainer: {
    height: 120,
    position: "relative",
  },
  analyticsEmptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  analyticsMonthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  monthLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
  },
  // Discounts Section Styles
  discountsContent: {
    paddingTop: 8,
  },
  discountsDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
  discountsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
    marginRight: 4,
  },
  progressIndicator: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
});

export default HomeScreen;
