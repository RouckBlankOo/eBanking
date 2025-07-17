import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";

// Define transaction notification type
interface TransactionNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

// Sample data
const SAMPLE_TRANSACTIONS: TransactionNotification[] = [
  {
    id: "1",
    title: "Transactions",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "2",
    title: "Transactions",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "3",
    title: "Transactions",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "4",
    title: "Transactions",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "5",
    title: "Transactions",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
];

export default function TransactionsNotificationsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  const renderTransaction = ({ item }: { item: TransactionNotification }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.transactionContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.transactionDate}>
        {item.date} {item.time}
      </Text>
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Transactions</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Transactions List */}
        <FlatList
          data={SAMPLE_TRANSACTIONS}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionsList}
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
  transactionsList: {
    paddingBottom: 20,
  },
  transactionItem: {
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  transactionContent: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 12,
  },
  transactionDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "right",
  },
});
