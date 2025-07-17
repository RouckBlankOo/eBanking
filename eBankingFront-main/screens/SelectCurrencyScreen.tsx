import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../components/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";

interface Currency {
  id: string;
  symbol: string;
  name: string;
  icon: any;
  value: string;
  usdValue: string;
}

export default function SelectCurrencyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [currencies] = useState<Currency[]>([
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      icon: require("../assets/Icons/Binances.png"), // We'll use Binances as BTC placeholder
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      icon: require("../assets/Icons/ETH.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "3",
      symbol: "USDT",
      name: "USDT",
      icon: require("../assets/Icons/USDT.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "4",
      symbol: "USDC",
      name: "USDC",
      icon: require("../assets/Icons/USDC.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "5",
      symbol: "SOL",
      name: "Solana",
      icon: require("../assets/Icons/SOL.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "6",
      symbol: "BTC",
      name: "Bitcoin",
      icon: require("../assets/Icons/Binances.png"), // Using existing icon as placeholder
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "7",
      symbol: "ETH",
      name: "Ethereum",
      icon: require("../assets/Icons/ETH.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
    {
      id: "8",
      symbol: "USDT",
      name: "USDT",
      icon: require("../assets/Icons/USDT.png"),
      value: "114.71385438",
      usdValue: "114.7USD",
    },
  ]);

  const handleCurrencySelect = (currency: Currency) => {
    console.log("Selected currency:", currency.symbol);
    // Navigate to SelectMethod screen with the selected currency
    navigation.navigate("SelectMethod", {
      currency: {
        symbol: currency.symbol,
        name: currency.name,
        icon: currency.icon,
      },
    });
  };

  const renderCurrencyItem = (currency: Currency) => (
    <TouchableOpacity
      key={currency.id}
      style={styles.currencyItem}
      onPress={() => handleCurrencySelect(currency)}
      activeOpacity={0.8}
    >
      <View style={styles.currencyLeft}>
        <View style={styles.currencyIconContainer}>
          <Image
            source={currency.icon}
            style={styles.currencyIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencySymbol}>{currency.symbol}</Text>
          <Text style={styles.currencyName}>{currency.name}</Text>
        </View>
      </View>
      <View style={styles.currencyRight}>
        <Text style={styles.currencyValue}>{currency.value}</Text>
        <Text style={styles.currencyUsdValue}>≈ {currency.usdValue}</Text>
      </View>
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Select Currency</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Currency List */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {currencies.map((currency) => renderCurrencyItem(currency))}
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
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.01)",

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  currencyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  currencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  currencyIcon: {
    width: 32,
    height: 32,
  },
  currencyInfo: {
    flex: 1,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  currencyName: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  currencyRight: {
    alignItems: "flex-end",
  },
  currencyValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  currencyUsdValue: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
