import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Text from "../components/Text";
import { SuccessIcon } from "../components/LottieIcon";
import { useAlert } from "../context/AlertContext";

export default function CreateCardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const { showError } = useAlert();

  const cardTypes = [
    {
      id: "virtual",
      name: "Virtual Card",
      description: "Perfect for online purchases",
      icon: "card-outline",
      color: "#3B82F6",
    },
    {
      id: "physical",
      name: "Physical Card",
      description: "For in-store and ATM usage",
      icon: "card",
      color: "#10B981",
    },
    {
      id: "premium",
      name: "Premium Card",
      description: "Enhanced benefits and rewards",
      icon: "diamond-outline",
      color: "#F59E0B",
    },
  ];

  const handleCreateCard = () => {
    if (!selectedCardType) {
      showError("Please select a card type");
      return;
    }

    // Navigate to CardTypes screen to start the card creation flow
    navigation.navigate("CardTypes");
  };

  return (
    <OnboardingBackground>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <View style={[styles.container, { paddingTop: insets.top + 1 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Card</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Choose the type of card you&apos;d like to create
          </Text>

          {/* Card Type Options */}
          <View style={styles.cardTypesContainer}>
            {cardTypes.map((cardType) => (
              <TouchableOpacity
                key={cardType.id}
                style={[
                  styles.cardTypeOption,
                  selectedCardType === cardType.id && styles.selectedCardType,
                ]}
                onPress={() => setSelectedCardType(cardType.id)}
              >
                <View
                  style={[
                    styles.cardTypeIcon,
                    { backgroundColor: cardType.color },
                  ]}
                >
                  <Ionicons
                    name={cardType.icon as any}
                    size={32}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.cardTypeInfo}>
                  <Text style={styles.cardTypeName}>{cardType.name}</Text>
                  <Text style={styles.cardTypeDescription}>
                    {cardType.description}
                  </Text>
                </View>
                {selectedCardType === cardType.id && <SuccessIcon size={24} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Card Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                <Text style={styles.featureText}>Enhanced Security</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="flash" size={20} color="#10B981" />
                <Text style={styles.featureText}>Instant Activation</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="globe" size={20} color="#10B981" />
                <Text style={styles.featureText}>Global Acceptance</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="notifications" size={20} color="#10B981" />
                <Text style={styles.featureText}>Real-time Notifications</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Create Button */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={[
              styles.createButton,
              { opacity: selectedCardType ? 1 : 0.5 },
            ]}
            onPress={handleCreateCard}
            disabled={!selectedCardType}
          >
            <Text style={styles.createButtonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 32,
    textAlign: "center",
  },
  cardTypesContainer: {
    marginBottom: 32,
  },
  cardTypeOption: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCardType: {
    borderColor: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
  },
  cardTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTypeInfo: {
    flex: 1,
  },
  cardTypeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardTypeDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  featuresContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  createButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
    backgroundColor: "transparent",
  },
  createButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
