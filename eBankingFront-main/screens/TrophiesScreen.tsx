import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { UserHeader } from "@/components/UserHeader";
import { ThemedText } from "@/components/ThemedText";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";

export default function TrophiesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Function to handle profile press
  const handleProfilePress = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top - 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as HomePage */}
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
              <Image
                source={require("@/assets/Icons/Notification.png")}
                style={styles.notificationIcon}
                resizeMode="contain"
              />
              <View style={styles.notificationBadge}>
                <ThemedText style={styles.notificationCount}>5</ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Referral Card */}
        <View style={styles.mainCard}>
          <View style={styles.mainCardContent}>
            <View style={styles.mainCardLeft}>
              <Text style={styles.mainCardTitle}>
                Refer friends and earn up to
              </Text>
              <Text style={styles.mainCardSubtitle}>
                <Text style={styles.blueText}>40% Commission</Text>
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Invited friends</Text>
                  <Text style={styles.statValue}>77</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total earned(USDC)</Text>
                  <Text style={styles.statValue}>50,662</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.shareLinkButton}
                onPress={() => navigation.navigate("InviteFriendsScreen")}
              >
                <Text style={styles.shareLinkText}>Share Link</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainCardRight}>
              <Image
                source={require("@/assets/Icons/reward.png")}
                style={styles.mainCardImage}
                resizeMode="contain"
              />
              <View style={styles.seeMoreContainer}>
                <TouchableOpacity style={styles.seeMoreButton}>
                  <Text style={styles.seeMoreText}>See More</Text>
                  <Image
                    source={require("@/assets/Icons/More.png")}
                    style={styles.chevronIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Cards Row */}
        <View style={styles.cardsRow}>
          {/* 50% OFF Card */}
          <TouchableOpacity style={[styles.smallCard, styles.saleCard]}>
            <Text style={styles.saleTitle}>50% OFF</Text>
            <Text style={styles.saleSubtitle}>Limited Sale</Text>
            <View style={styles.saleIconContainer}>
              <Image
                source={require("@/assets/Icons/Sale.png")}
                style={styles.saleIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Referral Challenge Card */}
          <TouchableOpacity style={[styles.smallCard, styles.challengeCard]}>
            <Text style={styles.challengeTitle}>Referral Challenge</Text>
            <Text style={styles.challengeSubtitle}>Lets invite</Text>
            <View style={styles.challengeIconContainer}>
              <Image
                source={require("@/assets/Icons/Star.png")}
                style={styles.challengeIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Team-Up Deals Card */}
        <TouchableOpacity style={styles.teamUpCard}>
          <View style={styles.teamUpContent}>
            <Text style={styles.teamUpTitle}>Team-Up Deals</Text>
            <Text style={styles.teamUpSubtitle}>
              Join Forces with 2 Friends to get 30% off Virtual Cards
            </Text>
          </View>
          <Image
            source={require("@/assets/Icons/teamUp.png")}
            style={styles.teamUpIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Financial Literacy Program Card */}
        <TouchableOpacity style={styles.literacyCard}>
          <View style={styles.literacyContent}>
            <Image
              source={require("@/assets/Icons/Financily.png")}
              style={styles.literacyIcon}
              resizeMode="contain"
            />
            <View style={styles.literacyTextContainer}>
              <Text style={styles.literacyTitle}>
                Financial Literacy Program
              </Text>
              <Text style={styles.literacySubtitle}>
                30% off virtual & physical cards exclusively for students and
                faculty!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  mainCard: {
    backgroundColor: "rgba(20, 25, 35, 0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  mainCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainCardLeft: {
    flex: 1,
    paddingRight: 16,
  },
  mainCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  mainCardSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  blueText: {
    color: "#0066FF",
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statItem: {
    marginRight: 24,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0066FF",
  },
  shareLinkButton: {
    backgroundColor: "#0066FF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  shareLinkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  mainCardRight: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainCardImage: {
    width: 120,
    height: 120,
    marginTop: 30,
    marginRight: -10,
    marginBottom: -15,
  },
  seeMoreContainer: {
    alignItems: "center",
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 12,
    color: "#0066FF",
    marginRight: 4,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: "#0066FF",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  smallCard: {
    alignItems: "center",
    flex: 1,
    borderRadius: 16,
    padding: 16,
    height: 140,
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
  },
  saleCard: {
    backgroundColor: "rgba(20, 25, 35, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  saleTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  saleSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 16,
  },
  saleIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  saleIcon: {
    marginTop: 100,
    marginLeft: -110,
    width: 80,
    height: 80,
  },
  challengeCard: {
    backgroundColor: "rgba(20, 25, 35, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0066FF",
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 16,
  },
  challengeIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  challengeIcon: {
    marginTop: 100,
    marginLeft: -110,
    width: 80,
    height: 80,
  },
  teamUpCard: {
    backgroundColor: "rgba(20, 25, 35, 0.9)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  teamUpContent: {
    flex: 1,
    paddingRight: 16,
  },
  teamUpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066FF",
    marginBottom: 8,
  },
  teamUpSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 16,
  },
  teamUpIcon: {
    width: 110,
    height: 110,
  },
  literacyCard: {
    backgroundColor: "rgba(20, 25, 35, 0.9)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  literacyContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  literacyIcon: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  literacyTextContainer: {
    flex: 1,
  },
  literacyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066FF",
    marginBottom: 8,
  },
  literacySubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 16,
  },
});
