import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import Text from "../components/Text";
import { RootStackParamList } from "../types";

interface CurrencyOption {
  id: string;
  name: string;
  symbol: string;
  icon: any;
  range: string;
}

const CURRENCIES: CurrencyOption[] = [
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    icon: require("../assets/Icons/USDC.png"),
    range: "10.00-100000.00",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: require("../assets/Icons/ETH.png"), // Using ETH icon as placeholder for BTC
    range: "10.00-100000.00",
  },
];

const ConvertScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>(
    CURRENCIES[0]
  );
  const [toCurrency, setToCurrency] = useState<CurrencyOption>(CURRENCIES[1]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleContinue = () => {
    try {
      // Navigate to next step or handle conversion
      console.log("Continue conversion");
      // For now, just go back to demonstrate it's working
      navigation.goBack();
    } catch (error) {
      console.error("Error in handleContinue:", error);
    }
  };

  const handleFromCurrencyPress = () => {
    try {
      console.log("From currency pressed");
      // Open currency selector modal
    } catch (error) {
      console.error("Error in handleFromCurrencyPress:", error);
    }
  };

  const handleToCurrencyPress = () => {
    try {
      console.log("To currency pressed");
      // Open currency selector modal
    } catch (error) {
      console.error("Error in handleToCurrencyPress:", error);
    }
  };

  const CurrencySelector = ({
    currency,
    label,
    onPress,
  }: {
    currency: CurrencyOption;
    label: string;
    onPress: () => void;
  }) => (
    <View style={styles.currencyContainer}>
      <Text style={styles.currencyLabel}>{label}</Text>
      <TouchableOpacity style={styles.currencySelector} onPress={onPress}>
        <View style={styles.currencyLeft}>
          <View style={styles.currencyIconContainer}>
            <Image source={currency.icon} style={styles.currencyIcon} />
          </View>
          <Text style={styles.currencyName}>{currency.symbol}</Text>
          <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.currencyRight}>
          <Text style={styles.currencyRange}>{currency.range}</Text>
          <Text style={styles.maxLabel}>Max</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <OnboardingBackground style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Convert</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Currency Selectors */}
        <View style={styles.currencySection}>
          <CurrencySelector
            currency={fromCurrency}
            label="From"
            onPress={handleFromCurrencyPress}
          />

          {/* Swap Button */}
          <View style={styles.swapButtonContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapCurrencies}
            >
              <Ionicons name="swap-vertical" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          <CurrencySelector
            currency={toCurrency}
            label="To"
            onPress={handleToCurrencyPress}
          />
        </View>

        {/* Exchange Rate */}
        <View style={styles.exchangeRateContainer}>
          <Text style={styles.exchangeRate}>1 USDT = 0.00000926 BTC</Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleContinue}>
            <LinearGradient
              colors={["#3B82F6", "#1D4ED8"]}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </OnboardingBackground>
  );
};

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
    paddingVertical: 20,
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
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerRight: {
    width: 40, // To balance the header
  },
  currencySection: {
    marginTop: 20,
  },
  currencyContainer: {
    marginBottom: 16,
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
  },
  currencySelector: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currencyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  currencyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  currencyIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  currencyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 8,
  },
  currencyRight: {
    alignItems: "flex-end",
  },
  currencyRange: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  maxLabel: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 2,
  },
  swapButtonContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exchangeRateContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  exchangeRate: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ConvertScreen;
