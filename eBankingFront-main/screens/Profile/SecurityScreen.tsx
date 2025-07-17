import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../../components/Text";
import { useAlert } from "../../context/AlertContext";
import { UniversalBackground } from "../../components/UniversalBackground";

const SecurityScreen: React.FC = () => {
  const navigation = useNavigation();
  const { showSuccess, showInfo } = useAlert();
  const [accountEnabled, setAccountEnabled] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEmailPress = () => {
    navigation.navigate("ChangeEmail" as never);
  };

  const handleTelephonePress = () => {
    showInfo(
      "Telephone Authentication",
      "Configure phone authentication settings"
    );
  };

  const handleChangePasswordPress = () => {
    navigation.navigate("ChangePassword" as never);
  };

  const handleDevicesPress = () => {
    navigation.navigate("Devices" as never);
  };

  const handleDeleteAccountPress = () => {
    showInfo(
      "Delete Account",
      "Account deletion requires additional verification"
    );
  };

  const toggleAccountEnabled = () => {
    setAccountEnabled(!accountEnabled);
    showSuccess(
      "Account Updated",
      `Account ${!accountEnabled ? "enabled" : "disabled"} successfully`,
      3000
    );
  };

  return (
    <UniversalBackground variant="banking" style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Security Level Card */}
      <View style={styles.securityLevelCard}>
        <View style={styles.securityLevelContent}>
          <View style={styles.securityLevelText}>
            <Text style={styles.securityLevelTitle}>security level</Text>
            <Text style={styles.securityLevelDescription}>
              Enable multiple authentication methods to enhance your account
              security.
            </Text>
            <View style={styles.mediumBadge}>
              <Text style={styles.mediumBadgeText}>Medium</Text>
            </View>
          </View>
          <View style={styles.securityLevelIcon}>
            <Image
              source={require("../assets/Icons/SecurityLevel.png")}
              style={styles.securityIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Authentication Methods */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Authentication Methods</Text>

        <TouchableOpacity onPress={handleEmailPress}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>E-mail</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTelephonePress}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="call-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.menuText}>Telephone</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Advanced Security */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Advanced Security</Text>

        <TouchableOpacity onPress={handleChangePasswordPress}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.menuText}>change password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDevicesPress}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.menuText}>Devices</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Account Management */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account Management</Text>

        <LinearGradient
          colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
          style={styles.menuItem}
        >
          <View style={styles.menuLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>Account Enabled</Text>
          </View>
          <Switch
            value={accountEnabled}
            onValueChange={toggleAccountEnabled}
            trackColor={{ false: "#3e3e3e", true: "#FFC107" }}
            thumbColor={accountEnabled ? "#FFFFFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </LinearGradient>

        <TouchableOpacity onPress={handleDeleteAccountPress}>
          <LinearGradient
            colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
              </View>
              <Text style={[styles.menuText, styles.deleteAccountText]}>
                Delete Account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom padding */}
      <View style={styles.bottomPadding} />
    </UniversalBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#1A1A1A",
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
  placeholder: {
    width: 40,
  },
  securityLevelCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 16,
  },
  securityLevelContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  securityLevelText: {
    flex: 1,
    marginRight: 20,
  },
  securityLevelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  securityLevelDescription: {
    fontSize: 14,
    color: "#888888",
    lineHeight: 20,
    marginBottom: 16,
  },
  mediumBadge: {
    backgroundColor: "#FFC107",
    paddingHorizontal: "35%",
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  mediumBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  securityLevelIcon: {
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  securityIcon: {
    width: 120,
    height: 120,
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
  deleteAccountText: {
    color: "#EF4444",
  },
  bottomPadding: {
    height: 10,
  },
});

export default SecurityScreen;
