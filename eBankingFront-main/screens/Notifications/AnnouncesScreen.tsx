import Text from "@/components/Text";
import { OnboardingBackground } from "@/components/UniversalBackground";
import { RootStackParamList } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define announcement type
interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

// Sample data
const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Announces",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "2",
    title: "Announces",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
  {
    id: "3",
    title: "Announces",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    date: "13/08",
    time: "17:00PM",
    read: false,
  },
];

export default function AnnouncesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <TouchableOpacity style={styles.announcementItem}>
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.announcementContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.announcementDate}>
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
          <Text style={styles.headerTitle}>Announces</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Announcements List */}
        <FlatList
          data={SAMPLE_ANNOUNCEMENTS}
          renderItem={renderAnnouncement}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.announcementsList}
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
  announcementsList: {
    paddingBottom: 20,
  },
  announcementItem: {
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  announcementHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  announcementContent: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 12,
  },
  announcementDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "right",
  },
});
