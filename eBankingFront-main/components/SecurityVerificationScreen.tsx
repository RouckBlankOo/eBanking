import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import { RootStackParamList } from "../types";
import { OnboardingBackground } from "./UniversalBackground";

type SecurityVerificationRouteProp = RouteProp<
  RootStackParamList,
  "SecurityVerification"
>;

const SecurityVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<SecurityVerificationRouteProp>();
  const actionName = route.params?.actionName || "deposit";

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleIdentityVerification = () => {
    // Navigate to Personal Information screen to start verification
    navigation.navigate("PersonalInformation");
  };

  return (
    <OnboardingBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Warning Banner */}
          <View style={styles.warningBanner}>
            <View style={styles.warningIcon}>
              <Ionicons name="warning" size={20} color="#000000" />
            </View>
            <Text style={styles.warningText}>
              Before {actionName}, you need to complete the following security
              certifications
            </Text>
          </View>

          {/* Identity Verification Card */}
          <TouchableOpacity
            style={styles.verificationCard}
            onPress={handleIdentityVerification}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person-outline" size={24} color="#666666" />
                </View>
                <Text style={styles.cardTitle}>Identity verification</Text>
              </View>
              <View style={styles.cardRight}>
                <View style={styles.statusIcon}>
                  <Ionicons name="warning" size={20} color="#FF6B35" />
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666666" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  warningBanner: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  warningIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    lineHeight: 22,
    fontWeight: "500",
  },
  verificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    flex: 1,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF4F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});

export default SecurityVerificationScreen;
