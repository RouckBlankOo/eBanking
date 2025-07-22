import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomAlert from "../../components/CustomAlert";
import { ThemedText } from "../../components/ThemedText";
import { UniversalBackground } from "../../components/UniversalBackground";
import { RootStackParamList } from "../../types";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pendingAlerts, setPendingAlerts] = useState<
    { type: "success" | "info"; message: string }[]
  >([]);
  const [currentAlert, setCurrentAlert] = useState<{
    type: "success" | "info";
    message: string;
  } | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const currentCurrency = "TND";
  const currentLanguage = "English";
  const currentTheme = "Dark";

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCurrencyPress = () => {
    console.log("Navigate to currency selection");
  };

  const handleLanguagePress = () => {
    console.log("Navigate to language selection");
  };

  const handleThemePress = () => {
    console.log("Navigate to theme selection");
  };

  const handleAuthorizationsPress = () => {
    console.log("Navigate to authorizations");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigation.navigate("Login");
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await import(
        "expo-notifications"
      ).then((m) => m.getPermissionsAsync());
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await import("expo-notifications").then((m) =>
          m.requestPermissionsAsync()
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      console.log("Registering for push notifications...");
      const token = await import("expo-notifications").then((m) =>
        m.getExpoPushTokenAsync()
      );
      console.log("Token:", token);
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  };

  const disablePushNotifications = () => {
    console.log("Push notifications disabled.");
  };

  const toggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    setPendingAlerts((prev) => [
      ...prev,
      {
        type: value ? "success" : "info",
        message: value
          ? "Notifications activated"
          : "Notifications deactivated",
      },
    ]);
    if (value) {
      registerForPushNotificationsAsync();
    } else {
      disablePushNotifications();
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentAlert) {
      // Display the current alert for 2000ms, then clear it
      timer = setTimeout(() => {
        setCurrentAlert(null);
      }, 4000);
    } else if (pendingAlerts.length > 0) {
      // If no current alert and there are pending alerts, show the next one
      const nextAlert = pendingAlerts[0];
      setCurrentAlert(nextAlert);
      setPendingAlerts((prev) => prev.slice(1));
    }
    // Cleanup timer on unmount or when currentAlert changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentAlert, pendingAlerts]);

  return (
    <UniversalBackground variant="banking" style={styles.container}>
      {currentAlert && (
        <CustomAlert
          visible={true}
          type={currentAlert.type}
          title={currentAlert.message}
          buttons={[]}
        />
      )}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleCurrencyPress}
        >
          <View style={styles.settingIconContainer}>
            <Image
              source={require("../../assets/Icons/Currency.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.settingText}>Currency</ThemedText>
          <View style={styles.valueContainer}>
            <View style={styles.currencyBadge}>
              <ThemedText style={styles.currencyBadgeText}>
                {currentCurrency}
              </ThemedText>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleLanguagePress}
        >
          <View style={styles.settingIconContainer}>
            <Image
              source={require("../../assets/Icons/language.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.settingText}>Language</ThemedText>
          <View style={styles.valueContainer}>
            <ThemedText style={styles.valueText}>{currentLanguage}</ThemedText>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Image
              source={require("../../assets/Icons/Notification.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.settingText}>Notifications</ThemedText>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "rgba(255, 255, 255, 0.1)", true: "#3B82F6" }}
            thumbColor={notificationsEnabled ? "#FFFFFF" : "#F4F3F4"}
            ios_backgroundColor="rgba(255, 255, 255, 0.1)"
            style={styles.switch}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleThemePress}>
          <View style={styles.settingIconContainer}>
            <Image
              source={require("../../assets/Icons/Theme.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.settingText}>Theme</ThemedText>
          <View style={styles.valueContainer}>
            <ThemedText style={styles.valueText}>{currentTheme}</ThemedText>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleAuthorizationsPress}
        >
          <View style={styles.settingIconContainer}>
            <Image
              source={require("../../assets/Icons/Authorization.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.settingText}>Authorizations</ThemedText>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="rgba(255, 255, 255, 0.5)"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <View
            style={[styles.settingIconContainer, styles.logoutIconContainer]}
          >
            <Image
              source={require("../../assets/Icons/LogOut.png")}
              style={[styles.iconImage, { tintColor: "#F87171" }]}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="rgba(255, 255, 255, 0.5)"
          />
        </TouchableOpacity>
      </ScrollView>
    </UniversalBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(29, 36, 45, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: 8,
  },
  currencyBadge: {
    backgroundColor: "#FB7185",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  currencyBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  logoutItem: {
    marginTop: 16,
  },
  logoutIconContainer: {
    backgroundColor: "rgba(248, 113, 113, 0.2)",
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#F87171",
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
});

export default SettingsScreen;
