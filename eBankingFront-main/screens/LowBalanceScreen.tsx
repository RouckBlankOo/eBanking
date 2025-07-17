import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";

// Define low balance notification type
interface LowBalanceNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

// Sample data
const SAMPLE_LOW_BALANCE_NOTIFICATIONS: LowBalanceNotification[] = [
  {
    id: "1",
    title: "Low balance",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "2",
    title: "Low balance",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "3",
    title: "Low balance",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "4",
    title: "Low balance",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
];

export default function LowBalanceScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle deposit action
  const handleDeposit = () => {
    // Navigate to deposit screen
    navigation.navigate("SelectCurrency");
  };

  const renderLowBalanceNotification = ({
    item,
  }: {
    item: LowBalanceNotification;
  }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.notificationContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.notificationFooter}>
        <Text style={styles.notificationDate}>
          {item.date} {item.time}
        </Text>
        <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
          <Text style={styles.depositButtonText}>Go To Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Low Balance</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Low Balance Notifications List */}
        <FlatList
          data={SAMPLE_LOW_BALANCE_NOTIFICATIONS}
          renderItem={renderLowBalanceNotification}
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
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  depositButton: {
    backgroundColor: "#0070F3",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  depositButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
