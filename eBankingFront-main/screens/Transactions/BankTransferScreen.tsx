import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NumberPad from "../../components/NumberPad";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { RootStackParamList } from "../../types";

export default function BankTransferScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Get the selected currency from navigation params
  const params = route.params as any;
  const selectedCurrency = params?.currency || { symbol: "USDC", name: "USDC" };

  const [amount, setAmount] = useState("100");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState("100");

  // Quick amount options
  const quickAmounts = ["100 TND", "500 TND", "1000 TND", "Max"];

  // Calculate USD equivalent (example rate: 1 TND = 0.2857 USDC)
  const exchangeRate = 0.2857;
  const usdcAmount = (parseFloat(amount) * exchangeRate).toFixed(2);

  const handleNumberPress = (number: string) => {
    if (amount === "0" || amount === "100") {
      setAmount(number);
    } else {
      setAmount(amount + number);
    }
    setSelectedQuickAmount("");
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount("0");
    }
    setSelectedQuickAmount("");
  };

  const handleDecimal = () => {
    if (!amount.includes(".")) {
      setAmount(amount + ".");
    }
  };

  const handleQuickAmountSelect = (quickAmount: string) => {
    if (quickAmount === "Max") {
      setAmount("3000");
      setSelectedQuickAmount("Max");
    } else {
      const numericAmount = quickAmount.replace(" TND", "");
      setAmount(numericAmount);
      setSelectedQuickAmount(numericAmount);
    }
  };

  const handleTopUpNow = () => {
    navigation.navigate("BankTransferDetails", {
      amount,
      currency: "TND",
      usdcAmount,
    });
  };

  return (
    <OnboardingBackground style={styles.container}>
      <View
        style={[
          styles.content,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Deposit {selectedCurrency.name}
          </Text>
          <View style={styles.headerRight} />
        </View>

        {/* Currency Display */}
        <View style={styles.currencySection}>
          <View style={styles.currencyRow}>
            <View style={styles.currencyIconContainer}>
              {selectedCurrency.icon ? (
                <Image
                  source={selectedCurrency.icon}
                  style={styles.currencyIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.currencyIconPlaceholder}>
                  <Text style={styles.currencyIconText}>$</Text>
                </View>
              )}
            </View>
            <Text style={styles.currencyName}>{selectedCurrency.name}</Text>
          </View>
        </View>

        {/* Deposit Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Deposit Amount</Text>

          {/* Amount Display */}
          <View style={styles.amountDisplay}>
            <Text style={styles.amountValue}>{amount} TND</Text>
            <TouchableOpacity style={styles.swapButton}>
              <Ionicons name="swap-vertical" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <Text style={styles.usdcEquivalent}>
            ≈ {usdcAmount} {selectedCurrency.symbol}
          </Text>

          {/* Range Display */}
          <Text style={styles.rangeText}>100 TND - 3000 TND</Text>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountContainer}>
            {quickAmounts.map((quickAmount, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickAmountButton,
                  (selectedQuickAmount === quickAmount ||
                    (quickAmount !== "Max" &&
                      selectedQuickAmount ===
                        quickAmount.replace(" TND", ""))) &&
                    styles.quickAmountButtonSelected,
                ]}
                onPress={() => handleQuickAmountSelect(quickAmount)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    (selectedQuickAmount === quickAmount ||
                      (quickAmount !== "Max" &&
                        selectedQuickAmount ===
                          quickAmount.replace(" TND", ""))) &&
                      styles.quickAmountTextSelected,
                  ]}
                >
                  {quickAmount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spacer to push content to bottom */}
        <View style={{ flex: 1 }} />

        {/* Top-Up Now Button */}
        <TouchableOpacity
          style={styles.topUpButton}
          onPress={handleTopUpNow}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/Icons/Bank.png")}
            style={styles.topUpIcon}
          />
          <Text style={styles.topUpText}>Top-Up Now</Text>
        </TouchableOpacity>

        {/* Number Pad */}
        <NumberPad
          onNumberPress={handleNumberPress}
          onBackspace={handleBackspace}
          onDecimal={handleDecimal}
          showDecimal={true}
          style={styles.numberPad}
        />
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
    paddingVertical: 12,
    marginBottom: 10,
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
  currencySection: {
    alignItems: "center",
    marginBottom: 10,
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currencyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  currencyIcon: {
    width: 40,
    height: 40,
  },
  currencyIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  currencyIconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  currencyName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  amountSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  amountLabel: {
    marginBottom: 20,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  amountDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 20,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 16,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  usdcEquivalent: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 16,
  },
  rangeText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 20,
  },
  quickAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  quickAmountButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickAmountButtonSelected: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    borderColor: "#3B82F6",
  },
  quickAmountText: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
  },
  quickAmountTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  topUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 15,
    paddingVertical: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  topUpIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#FFFFFF",
  },
  topUpText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  numberPad: {
    marginBottom: 80,
  },
});
