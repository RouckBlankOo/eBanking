import Text from "@/components/Text";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { RootStackParamList } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define system notification type
interface SystemNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  type: "security" | "card" | "system";
  read: boolean;
}

// Sample data
const SAMPLE_SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "1",
    title: "Security Notification",
    content:
      "Your card ending in XXXX has been frozen. If you want to unfteeze it, on the card page in the APP...",
    date: "13/08",
    time: "17:00PM",
    type: "security",
    read: false,
  },
  {
    id: "2",
    title: "Card locked",
    content:
      "Your card ending in XXXX has been frozen. If you want to unfteeze it, on the card page in the APP...",
    date: "13/08",
    time: "17:00PM",
    type: "card",
    read: false,
  },
  {
    id: "3",
    title: "Card locked",
    content:
      "Your card ending in XXXX has been frozen. If you want to unfteeze it, on the card page in the APP...",
    date: "13/08",
    time: "17:00PM",
    type: "card",
    read: false,
  },
  {
    id: "4",
    title: "Card locked",
    content:
      "Your card ending in XXXX has been frozen. If you want to unfteeze it, on the card page in the APP...",
    date: "13/08",
    time: "17:00PM",
    type: "card",
    read: false,
  },
  {
    id: "5",
    title: "Card locked",
    content:
      "Your card ending in XXXX has been frozen. If you want to unfteeze it, on the card page in the APP...",
    date: "13/08",
    time: "17:00PM",
    type: "card",
    read: false,
  },
];

export default function SystemNotificationsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  const getNotificationIcon = (type: SystemNotification["type"]) => {
    switch (type) {
      case "security":
        return "shield-checkmark-outline";
      case "card":
        return "card-outline";
      case "system":
        return "settings-outline";
      default:
        return "information-circle-outline";
    }
  };

  const renderSystemNotification = ({ item }: { item: SystemNotification }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <View style={styles.titleContainer}>
          <Ionicons
            name={getNotificationIcon(item.type) as any}
            size={20}
            color="#0070F3"
            style={styles.notificationIcon}
          />
          <Text style={styles.notificationTitle}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.notificationContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.notificationDate}>
        {item.date} {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#000000" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />

      <View style={[styles.content, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>System notifications</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* System Notifications List */}
        <FlatList
          data={SAMPLE_SYSTEM_NOTIFICATIONS}
          renderItem={renderSystemNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: 20,
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
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  notificationContent: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 12,
  },
  notificationDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "right",
  },
});
