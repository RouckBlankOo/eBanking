import { ThemedText } from "@/components/ThemedComponents";
import { BankingBackground } from "@/components/UniversalBackground";
import { SectionContainer } from "@/components/SectionContainer";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CoinWalletScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CoinWalletScreen"
>;

interface AssetItem {
  id: string;
  symbol: string;
  name: string;
  icon: any;
  balance: string;
  usdValue: string;
}

const CoinWalletScreen = () => {
  const navigation = useNavigation<CoinWalletScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<"overview" | "funding">(
    "overview"
  );
  const insets = useSafeAreaInsets();

  // Assets data matching the image
  const assets: AssetItem[] = [
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      icon: require("../assets/Icons/Binances.png"),
      balance: "114.71385438",
      usdValue: "114.7",
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      icon: require("../assets/Icons/ETH.png"),
      balance: "114.71385438",
      usdValue: "114.7",
    },
    {
      id: "3",
      symbol: "USDT",
      name: "USDT",
      icon: require("../assets/Icons/USDT.png"),
      balance: "114.71385438",
      usdValue: "114.7",
    },
    {
      id: "4",
      symbol: "USDC",
      name: "USDC",
      icon: require("../assets/Icons/USDC.png"),
      balance: "114.71385438",
      usdValue: "114.7",
    },
    {
      id: "5",
      symbol: "SOL",
      name: "Solana",
      icon: require("../assets/Icons/SOL.png"),
      balance: "114.71385438",
      usdValue: "114.7",
    },
  ];

  const renderAssetItem = ({ item }: { item: AssetItem }) => (
    <TouchableOpacity style={styles.assetItem}>
      <View style={styles.assetLeft}>
        <View style={[styles.assetIconContainer]}>
          <Image
            source={item.icon}
            style={styles.assetIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.assetInfo}>
          <ThemedText variant="title" style={styles.assetSymbol}>
            {item.symbol}
          </ThemedText>
          <ThemedText variant="secondary" style={styles.assetName}>
            {item.name}
          </ThemedText>
        </View>
      </View>
      <View style={styles.assetRight}>
        <ThemedText variant="title" style={styles.assetBalance}>
          {item.balance}
        </ThemedText>
        <ThemedText variant="secondary" style={styles.assetUsdValue}>
          ≈ {item.usdValue}USD
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <BankingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top - 10 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "overview" && styles.activeTab]}
            onPress={() => setActiveTab("overview")}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "overview" && styles.activeTabText,
              ]}
            >
              Overview
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "funding" && styles.activeTab]}
            onPress={() => setActiveTab("funding")}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "funding" && styles.activeTabText,
              ]}
            >
              Funding
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Portfolio Value */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioHeader}>
            <ThemedText variant="secondary" style={styles.portfolioLabel}>
              Est. Total Value (USD)
            </ThemedText>
            <Ionicons
              name="eye-outline"
              size={16}
              color="rgba(255, 255, 255, 0.6)"
            />
          </View>
          <ThemedText variant="title" style={styles.portfolioValue}>
            119.98{" "}
            <ThemedText variant="secondary" style={styles.currencyLabel}>
              USD
            </ThemedText>
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.addFundsButton}>
            <ThemedText style={styles.addFundsText}>+ Add Funds</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.withdrawButton}>
            <ThemedText style={styles.withdrawText}>- Withdraw</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Allocation Section */}
        <SectionContainer title="Allocation" titleOutside>
          <View style={styles.allocationItem}>
            <View style={styles.allocationLeft}>
              <View style={styles.allocationDot} />
              <ThemedText variant="title" style={styles.allocationText}>
                Funding Account
              </ThemedText>
            </View>
            <View style={styles.allocationRight}>
              <ThemedText variant="title" style={styles.allocationValue}>
                119.98 USD
              </ThemedText>
              <Ionicons
                name="chevron-down"
                size={16}
                color="rgba(255, 255, 255, 0.6)"
              />
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </SectionContainer>

        {/* Assets Section */}
        <SectionContainer title="Assets" titleOutside>
          <FlatList
            data={assets}
            renderItem={renderAssetItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styles.assetSeparator} />
            )}
          />
        </SectionContainer>
      </ScrollView>
    </BankingBackground>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
  },
  portfolioSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  portfolioHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  portfolioLabel: {
    fontSize: 14,
    marginRight: 8,
    color: "white",
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  currencyLabel: {
    fontSize: 18,
    fontWeight: "normal",
    color: "white",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  addFundsButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addFundsText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  withdrawText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  allocationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allocationLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  allocationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginRight: 12,
  },
  allocationText: {
    fontSize: 16,
    color: "white",
  },
  allocationRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  allocationValue: {
    fontSize: 16,
    marginRight: 8,
    color: "white",
  },
  progressBarContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  assetItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  assetIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  assetIcon: {
    width: 32,
    height: 32,
  },
  assetInfo: {
    justifyContent: "center",
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
    color: "white",
  },
  assetName: {
    fontSize: 14,
    color: "white",
  },
  assetRight: {
    alignItems: "flex-end",
  },
  assetBalance: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
    color: "white",
  },
  assetUsdValue: {
    fontSize: 14,
    color: "white",
  },
  assetSeparator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
});

export default CoinWalletScreen;
