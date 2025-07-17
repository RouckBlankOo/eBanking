import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../../components/UniversalBackground";
import {
  NavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAlert } from "../../context/AlertContext";
import Text from "../../components/Text";

type ChooseCardRouteProp = RouteProp<RootStackParamList, "ChooseCard">;

export default function ChooseCardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ChooseCardRouteProp>();
  const { cardType } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApplyCard = () => {
    Alert.alert(
      "Apply Card",
      `${
        cardType === "virtual" ? "Virtual" : "Premium"
      } card application functionality coming soon!`
    );
  };

  const handleCustomizeBadge = () => {
    navigation.navigate("CardCustomization", { cardType });
  };

  // Card configuration based on type
  const cardConfig =
    cardType === "virtual"
      ? {
          gradient: ["#8B7CF6", "#6366F1"],
          title: "Virtual card",
          description: "Pay Contactless Online Or In-Store",
          badge: "Customizable",
          price: "10 USD",
        }
      : {
          gradient: ["#F59E0B", "#D97706"],
          title: "Premium card",
          description: "Enhanced Benefits & Exclusive Rewards",
          badge: "Fully Customizable",
          price: "25 USD",
        };

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 1 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Card</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Customizable Badge */}
        <View style={styles.badgeContainer}>
          <TouchableOpacity
            style={[
              styles.customizableBadge,
              cardType === "premium" && styles.premiumBadge,
            ]}
            onPress={handleCustomizeBadge}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.googleDot,
                cardType === "premium" && styles.premiumDot,
              ]}
            />
            <Text
              style={[
                styles.badgeText,
                cardType === "premium" && styles.premiumBadgeText,
              ]}
            >
              {cardConfig.badge}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={cardType === "virtual" ? "#4285F4" : "#D97706"}
              style={styles.badgeArrow}
            />
          </TouchableOpacity>
        </View>

        {/* Card Preview */}
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={cardConfig.gradient as [string, string]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Visa Logo */}
            <View style={styles.cardHeader}>
              <Text style={styles.visaLogo}>VISA</Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              <Text style={styles.appName}>APP NAME</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Card Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{cardConfig.title}</Text>
          <Text style={styles.cardDescription}>{cardConfig.description}</Text>
          <Text style={styles.cardPrice}>{cardConfig.price}</Text>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyCard}>
          <LinearGradient
            colors={["#3B82F6", "#2563EB"]}
            style={styles.applyGradient}
          >
            <Text style={styles.applyButtonText}>Apply for Card</Text>
          </LinearGradient>
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
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
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
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  badgeContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  customizableBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(66, 133, 244, 0.1)",
    borderWidth: 1,
    borderColor: "#4285F4",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  premiumBadge: {
    backgroundColor: "rgba(217, 119, 6, 0.1)",
    borderColor: "#D97706",
  },
  googleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4285F4",
  },
  premiumDot: {
    backgroundColor: "#D97706",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4285F4",
  },
  premiumBadgeText: {
    color: "#D97706",
  },
  badgeArrow: {
    marginLeft: 4,
  },
  cardContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    marginVertical: 30,
  },
  card: {
    width: "100%",
    aspectRatio: 1.586,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardHeader: {
    alignItems: "flex-end",
  },
  visaLogo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  cardInfo: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 22,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3B82F6",
    marginTop: 8,
  },
  applyButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 40,
  },
  applyGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
