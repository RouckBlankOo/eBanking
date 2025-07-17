import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";
import { useAlert } from "@/context/AlertContext";

export default function InviteFriendsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { showConfirm, showSuccess } = useAlert();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  const handleInviteNow = () => {
    // Handle invite friends functionality
    console.log("Invite now pressed");
    // Implement share functionality here
  };

  const handleClaim = () => {
    // Show confirmation popup for claiming rewards
    showConfirm(
      "Claiming rewards in your wallet",
      undefined, // No additional message
      () => {
        // On confirm - proceed with claiming
        console.log("Claim confirmed");
        // Simulate claim process
        showSuccess(
          "Rewards Claimed!",
          "49.99 USDC added to your wallet",
          3000
        );
      },
      () => {
        // On cancel - do nothing
        console.log("Claim cancelled");
      },
      "Confirm", // Confirm button text
      "Cancel" // Cancel button text
    );
  };

  const handleRegisterNow = () => {
    // Handle register as partner
    console.log("Register now pressed");
  };

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
          <Text style={styles.headerTitle}>Invite Friends</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Refer friends and earn up to </Text>
            <Text style={styles.highlightText}>40% Commission</Text>
          </View>
          <Text style={styles.subtitle}>
            The more you invite, the more rewards you will receive.
          </Text>

          {/* Current Level Card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Current Level</Text>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>LV3</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "84%" }]} />
                </View>
                <Text style={styles.progressText}>64/30</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Commission Rates */}
            <View style={styles.commissionContainer}>
              <View style={styles.commissionItem}>
                <Text style={styles.commissionTitle}>Card Activation</Text>
                <Text style={styles.commissionValue}>30%</Text>
              </View>
              <View style={styles.commissionItem}>
                <Text style={styles.commissionTitle}>Transaction</Text>
                <Text style={styles.commissionValue}>0.2%</Text>
              </View>
              <View style={styles.commissionItem}>
                <Text style={styles.commissionTitle}>level 2</Text>
                <Text style={styles.commissionValue}>10%</Text>
              </View>
            </View>
          </View>

          {/* Ready to be claimed Card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Ready to be claimed (USDC)</Text>
            <View style={styles.claimContainer}>
              <Text style={styles.amountText}>49,99</Text>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={handleClaim}
              >
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statTitle}>Invited friends</Text>
                <Text style={styles.statValue}>77</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statTitle}>In processing</Text>
                <Text style={styles.statValue}>5,0662</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statTitle}>Set</Text>
                <Text style={styles.statValue}>346,9459</Text>
              </View>
            </View>
          </View>

          {/* Partner Card */}
          <View style={styles.partnerCard}>
            <View style={styles.partnerContent}>
              <Text style={styles.partnerText}>
                Become a partner and earn more
              </Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegisterNow}
              >
                <Text style={styles.registerButtonText}>Register now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("@/assets/Icons/Money.png")}
              style={styles.moneyImage}
            />
          </View>
        </ScrollView>

        {/* Invite Now Button */}
        <TouchableOpacity style={styles.inviteButton} onPress={handleInviteNow}>
          <Text style={styles.inviteButtonText}>Invite now</Text>
        </TouchableOpacity>
      </View>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  highlightText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066FF",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "rgba(20, 25, 35, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardLabel: {
    fontSize: 14,
    color: "#0066FF",
    marginBottom: 12,
    fontWeight: "500",
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 16,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0066FF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 16,
  },
  commissionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commissionItem: {
    alignItems: "center",
  },
  commissionTitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  commissionValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066FF",
  },
  claimContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  amountText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  claimButton: {
    backgroundColor: "#0066FF",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  claimButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statTitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066FF",
  },
  partnerCard: {
    backgroundColor: "rgba(20, 25, 35, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  partnerContent: {
    flex: 1,
  },
  partnerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: "#0066FF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: "flex-start",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  moneyImage: {
    width: 80,
    height: 80,
    marginLeft: 16,
  },
  inviteButton: {
    backgroundColor: "#0066FF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    shadowColor: "#0066FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
