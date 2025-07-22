import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { useAlert } from "../../context/AlertContext";
import { useUser } from "../../context/UserContext";
import { RootStackParamList } from "../../types";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useUser();
  const { showDestructiveConfirm, showError, showInfo } = useAlert();

  const handleLogout = async () => {
    showDestructiveConfirm(
      "Logout",
      "Are you sure you want to logout?",
      async () => {
        try {
          await AsyncStorage.removeItem("jwtToken");
          logout();
          navigation.navigate("Login" as never);
        } catch (error) {
          console.error("Logout error:", error);
          showError("Error", "Failed to logout properly");
        }
      }
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProfilePress = () => {
    // Navigate to profile details/edit screen
    showInfo("Profile", "Profile editing coming soon!");
  };

  const handleReferencePress = () => {
    // Navigate to referral screen
    showInfo("Reference", "Referral system coming soon!");
  };

  const handleSecurityPress = () => {
    // Navigate to security settings
    navigation.navigate("Security" as never);
  };

  const handleSettingsPress = () => {
    // Navigate to settings screen
    navigation.navigate("Settings");
  };

  const handleHelpPress = () => {
    // Navigate to help/support screen
    navigation.navigate("Help");
  };

  const handleMorePress = () => {
    // Navigate to QuickActionScreen
    navigation.navigate("QuickActionScreen");
  };

  // Remove unused functions
  const getMaskedUserId = () => {
    return `28****7]`;
  };

  const getFullUserId = () => {
    return "UID: 1983095534";
  };

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#000000" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <TouchableOpacity
          style={styles.profileSection}
          onPress={handleProfilePress}
        >
          <View style={styles.profileContent}>
            <View style={styles.profileInfo}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../../assets/Icons/DefaultProfile.png")}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>{getMaskedUserId()}</Text>
                <Text style={styles.profileId}>{getFullUserId()}</Text>
              </View>
            </View>
            <View style={styles.copyContainer}>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy-outline" size={16} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.profileArrow}>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Reference Section */}
        <TouchableOpacity
          style={styles.referenceSection}
          onPress={handleReferencePress}
        >
          <View style={styles.referenceBadge}>
            <Text style={styles.referenceBadgeText}>Reference</Text>
          </View>
          <View style={styles.referenceContent}>
            <View style={styles.referenceLeft}>
              <Text style={styles.referenceTitle}>
                Earn up to 40% commission by referring friends
              </Text>
              <View style={styles.referenceReward}>
                <Text style={styles.referenceRewardText}>
                  Yesterday + 0,06USDT
                </Text>
              </View>
            </View>
            <View style={styles.referenceImage}>
              <Image
                source={require("../../assets/Icons/ReferenceIcon.png")}
                style={styles.referenceIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Security Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Security Settings</Text>
          <TouchableOpacity onPress={handleSecurityPress}>
            <LinearGradient
              colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Image
                    source={require("../../assets/Icons/Security.png")}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Security</Text>
              </View>
              <View style={styles.menuRight}>
                <Text style={styles.securityLevel}>Medium</Text>
                <Ionicons name="chevron-forward" size={20} color="#64748B" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity onPress={handleSettingsPress}>
            <LinearGradient
              colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Image
                    source={require("../../assets/Icons/Settings.png")}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Settings</Text>
              </View>
              <View style={styles.menuRight}>
                <Ionicons name="chevron-forward" size={20} color="#64748B" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleHelpPress}>
            <LinearGradient
              colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Image
                    source={require("../../assets/Icons/Help.png")}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Help</Text>
              </View>
              <View style={styles.menuRight}>
                <Ionicons name="chevron-forward" size={20} color="#64748B" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMorePress}>
            <LinearGradient
              colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Image
                    source={require("../../assets/Icons/More.png")}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>More</Text>
              </View>
              <View style={styles.menuRight}>
                <Ionicons name="chevron-forward" size={20} color="#64748B" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.logoutGradient}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    backgroundColor: "#002657",
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#1E293B",
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  profileId: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  copyContainer: {
    marginRight: 12,
  },
  copyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileArrow: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  referenceSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  referenceBadge: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  referenceBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
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
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    lineHeight: 20,
  },
  referenceReward: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  referenceRewardText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
  },
  referenceImage: {
    marginLeft: 16,
  },
  referenceIcon: {
    width: 60,
    height: 60,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    flex: 1,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  securityLevel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F59E0B",
    marginRight: 8,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.1)",
    overflow: "hidden",
  },
  logoutGradient: {
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  bottomPadding: {
    height: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
});

export default ProfileScreen;
