import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Text from "../components/Text";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";

interface DepositMethod {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: string;
  minAmount?: string;
  maxAmount?: string;
  buttonColor: string;
}

export default function SelectMethodScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Get the selected currency from navigation params
  const selectedCurrency = (route.params as any)?.currency || {
    symbol: "USDC",
    name: "USDC",
  };

  const getDepositMethods = (currency: string): DepositMethod[] => [
    {
      id: "1",
      title: "Deposit cryptos from another platform",
      description: "",
      buttonText: "On-chain Deposit",
      buttonIcon: "On-chain.png",
      buttonColor: "#3B82F6",
    },
    {
      id: "2",
      title: "Funds deposited via Binance Pay are solely for wallet top-ups.",
      description: `0.01 ${currency} ~ 50000 ${currency}`,
      buttonText: "Binance Pay",
      buttonIcon: "BinanceApp.png",
      buttonColor: "#F59E0B",
    },
    {
      id: "3",
      title: "Funds deposited via Bank are solely for wallet top-ups.",
      description: `30.30 ${currency} ~ 910 ${currency}`,
      buttonText: "Bank transfer",
      buttonIcon: "Bank.png",
      buttonColor: "#3B82F6",
    },
  ];

  const depositMethods = getDepositMethods(selectedCurrency.symbol);

  const handleMethodSelect = (method: DepositMethod) => {
    console.log("Selected method:", method.buttonText);

    if (method.buttonText === "On-chain Deposit") {
      // Navigate to Deposit screen for on-chain deposits
      navigation.navigate("Deposit", {
        currency: selectedCurrency,
      });
    } else if (method.buttonText === "Bank transfer") {
      // Navigate to Bank Transfer screen
      navigation.navigate("BankTransfer", {
        currency: selectedCurrency,
      });
    } else if (method.buttonText === "Binance Pay") {
      // Navigate to Binance Pay screen
      navigation.navigate("BinancePay", {
        currency: selectedCurrency,
      });
    } else {
      // TODO: Navigate to other deposit flows
      Alert.alert(
        "Coming Soon",
        `${method.buttonText} functionality will be available soon!`
      );
    }
  };

  const renderMethodItem = (method: DepositMethod) => (
    <View key={method.id} style={styles.methodContainer}>
      <View style={styles.methodContent}>
        <Text style={styles.methodTitle}>{method.title}</Text>
        {method.description ? (
          <Text style={styles.methodDescription}>{method.description}</Text>
        ) : null}
        <TouchableOpacity
          style={[
            styles.methodButton,
            { backgroundColor: method.buttonColor },
            method.buttonText === "Binance Pay" && styles.binanceButton,
          ]}
          onPress={() => handleMethodSelect(method)}
          activeOpacity={0.8}
        >
          <Image
            source={
              method.buttonIcon === "On-chain.png"
                ? require("../assets/Icons/On-chain.png")
                : method.buttonIcon === "BinanceApp.png"
                ? require("../assets/Icons/BinanceApp.png")
                : require("../assets/Icons/Bank.png")
            }
            style={styles.buttonIcon}
          />
          <Text style={styles.methodButtonText}>{method.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Select Method</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Selected Currency Info */}
        <View style={styles.currencyInfo}>
          <View style={styles.currencyIconContainer}>
            {selectedCurrency.icon ? (
              <Image
                source={selectedCurrency.icon}
                style={styles.currencyIcon}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../assets/Icons/USDC.png")}
                style={styles.currencyIcon}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.currencySymbol}>{selectedCurrency.symbol}</Text>
        </View>

        {/* Deposit Methods */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {depositMethods.map((method) => renderMethodItem(method))}
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
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  currencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  currencyIcon: {
    width: 28,
    height: 28,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  methodContainer: {
    marginBottom: 20,
  },
  methodContent: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  methodTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 12,
    lineHeight: 22,
  },
  methodDescription: {
    fontSize: 14,
    color: "#F59E0B",
    marginBottom: 16,
    fontWeight: "500",
  },
  methodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minHeight: 48,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#FFFFFF",
  },
  methodButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  binanceButton: {
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
