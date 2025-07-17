import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";

// Define notification categories
const NOTIFICATION_CATEGORIES = [
  { id: "announces", title: "Announces", icon: "megaphone-outline" },
  {
    id: "transactions",
    title: "Transactions",
    icon: "swap-horizontal-outline",
  },
  { id: "lowBalance", title: "Low Balance", icon: "wallet-outline" },
  { id: "system", title: "System notifications", icon: "shield-outline" },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle category press
  const handleCategoryPress = (categoryId: string) => {
    switch (categoryId) {
      case "announces":
        navigation.navigate("AnnouncesScreen");
        break;
      case "transactions":
        navigation.navigate("TransactionsNotificationsScreen");
        break;
      case "lowBalance":
        navigation.navigate("LowBalanceScreen");
        break;
      case "system":
        navigation.navigate("SystemNotificationsScreen");
        break;
    }
  };

  const renderCategory = ({
    item,
  }: {
    item: (typeof NOTIFICATION_CATEGORIES)[0];
  }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons name={item.icon as any} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
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
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Categories List */}
        <FlatList
          data={NOTIFICATION_CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
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
  categoriesList: {
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
