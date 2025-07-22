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
import {
  NavigationProp,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { OnboardingBackground } from "@/components/UniversalBackground";
import Text from "@/components/Text";
import { RootStackParamList } from "@/types";

// Define action type
interface ActionItem {
  id: string;
  title: string;
  icon: any;
  onPress: () => void;
}

// Define section type
interface ActionSection {
  title: string;
  color: string;
  items: ActionItem[];
}

export default function QuickActionScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Define actions by section
  const sections: ActionSection[] = [
    {
      title: "Popular",
      color: "#3B82F6", // Blue
      items: [
        {
          id: "invite",
          title: "Invite Friends",
          icon: require("@/assets/Icons/Quick Actions/InviteFriends.png"),
          onPress: () => {
            // Handle invite friends
            console.log("Invite Friends button pressed");
            try {
              // Try multiple navigation approaches
              const parentNavigation = navigation.getParent();
              if (parentNavigation) {
                parentNavigation.navigate("InviteFriendsScreen");
                console.log(
                  "Navigation to InviteFriendsScreen via parent attempted"
                );
              } else {
                // Try using CommonActions
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "InviteFriendsScreen",
                  })
                );
                console.log(
                  "Navigation to InviteFriendsScreen via CommonActions attempted"
                );
              }
            } catch (error) {
              console.error("Navigation error:", error);
              // Last resort - try direct navigation
              try {
                navigation.navigate("InviteFriendsScreen");
                console.log("Direct navigation attempted as fallback");
              } catch (fallbackError) {
                console.error("Fallback navigation error:", fallbackError);
              }
            }
          },
        },
        {
          id: "gift",
          title: "Gift",
          icon: require("@/assets/Icons/Quick Actions/GiftFriend.png"),
          onPress: () => {
            // Handle gift
            console.log("Gift pressed");
          },
        },
      ],
    },
    {
      title: "Card",
      color: "#3B82F6", // Blue
      items: [
        {
          id: "requestCard",
          title: "Request A Card",
          icon: require("@/assets/Icons/Quick Actions/requestCard.png"),
          onPress: () => {
            navigation.navigate("CardTypes");
          },
        },
        {
          id: "priority",
          title: "Priority",
          icon: require("@/assets/Icons/Quick Actions/Priority.png"),
          onPress: () => {
            // Handle priority
            console.log("Priority pressed");
          },
        },
        {
          id: "cardSettings",
          title: "Card Settings",
          icon: require("@/assets/Icons/Quick Actions/cardSettings.png"),
          onPress: () => {
            // Handle card settings
            console.log("Card settings pressed");
          },
        },
      ],
    },
    {
      title: "Transaction",
      color: "#3B82F6", // Blue
      items: [
        {
          id: "deposit",
          title: "Deposit",
          icon: require("@/assets/Icons/Quick Actions/depositMoney.png"),
          onPress: () => {
            navigation.navigate("SelectCurrency");
          },
        },
        {
          id: "withdraw",
          title: "Withdraw",
          icon: require("@/assets/Icons/Quick Actions/withdrawMoney.png"),
          onPress: () => {
            navigation.navigate("Withdraw");
          },
        },
        {
          id: "send",
          title: "Send",
          icon: require("@/assets/Icons/Quick Actions/sendMoney.png"),
          onPress: () => {
            navigation.navigate("Send");
          },
        },
        {
          id: "scan",
          title: "Scan",
          icon: require("@/assets/Icons/Quick Actions/scanMoney.png"),
          onPress: () => {
            // Handle scan
            console.log("Scan pressed");
          },
        },
        {
          id: "convert",
          title: "Convert",
          icon: require("@/assets/Icons/Quick Actions/convertMoney.png"),
          onPress: () => {
            // Navigate to convert screen
            navigation.navigate("Convert");
          },
        },
      ],
    },
    {
      title: "Help",
      color: "#3B82F6", // Blue
      items: [
        {
          id: "learn",
          title: "Learn",
          icon: require("@/assets/Icons/Quick Actions/learnMoney.png"),
          onPress: () => {
            // Handle learn
            console.log("Learn pressed");
          },
        },
        {
          id: "chat",
          title: "Chat",
          icon: require("@/assets/Icons/Quick Actions/chatMoney.png"),
          onPress: () => {
            // Handle chat
            console.log("Chat pressed");
          },
        },
        {
          id: "community",
          title: "Community",
          icon: require("@/assets/Icons/Quick Actions/communityMoney.png"),
          onPress: () => {
            // Handle community
            console.log("Community pressed");
          },
        },
      ],
    },
  ];

  // Render action item
  const renderActionItem = (item: ActionItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.actionItem}
        onPress={item.onPress}
      >
        <View style={styles.actionIconContainer}>
          <Image
            source={item.icon}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.actionTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  // Render section
  const renderSection = (section: ActionSection, index: number) => {
    return (
      <View
        key={section.title}
        style={[styles.section, index > 0 && styles.sectionWithMargin]}
      >
        <Text style={[styles.sectionTitle, { color: section.color }]}>
          {section.title}
        </Text>
        <View style={styles.actionGrid}>
          {section.items.map((item) => renderActionItem(item))}
        </View>
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>Quick Action</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Actions List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {sections.map((section, index) => renderSection(section, index))}
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionWithMargin: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: -8, // To offset the padding of individual items
  },
  actionItem: {
    width: "25%", // Four items per row
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(21, 25, 32, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  actionTitle: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
