import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { RootStackParamList } from "../../types";

export default function CardTypesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectCardType = (cardType: "virtual" | "premium") => {
    navigation.navigate("ChooseCard", { cardType });
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
          <Text style={styles.headerTitle}>Choose Card Type</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {/* Virtual Card */}
          <TouchableOpacity
            style={styles.cardOption}
            onPress={() => handleSelectCardType("virtual")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#8B7CF6", "#6366F1"]}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Virtual Card</Text>
                  <Text style={styles.cardPrice}>$10</Text>
                </View>
                <Text style={styles.cardDescription}>
                  Perfect for online payments and contactless transactions
                </Text>
                <View style={styles.cardFeatures}>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>Instant activation</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>Customizable design</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>No physical delivery</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Premium Card */}
          <TouchableOpacity
            style={styles.cardOption}
            onPress={() => handleSelectCardType("premium")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#F59E0B", "#D97706"]}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Premium Card</Text>
                  <Text style={styles.cardPrice}>$25</Text>
                </View>
                <Text style={styles.cardDescription}>
                  Enhanced benefits with exclusive rewards and features
                </Text>
                <View style={styles.cardFeatures}>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>Full customization</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>Premium support</Text>
                  </View>
                  <View style={styles.feature}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#FFFFFF"
                    />
                    <Text style={styles.featureText}>Higher limits</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  cardOption: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    padding: 24,
  },
  cardContent: {
    gap: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
  cardFeatures: {
    gap: 12,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
