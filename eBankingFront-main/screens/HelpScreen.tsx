import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { UniversalBackground } from "../components/UniversalBackground";
import { ThemedText } from "../components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../types";

const HelpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = () => {
    // Navigate to message screen or open chat
    console.log("Navigate to message screen");
  };

  const handleHelp = () => {
    // Open help documentation or FAQ
    console.log("Open help documentation");
  };

  const handleFindAnswer = () => {
    // Open search or FAQ section
    console.log("Open search or FAQ");
  };

  return (
    <UniversalBackground variant="banking" style={styles.container}>
      {/* Header with back button */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <ThemedText style={styles.welcomeTitle}>Hello 👋</ThemedText>
        <ThemedText style={styles.welcomeSubtitle}>
          How can we help you?
        </ThemedText>
      </View>

      {/* Help Options */}
      <View style={styles.optionsContainer}>
        {/* Send Message Option */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleSendMessage}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="chatbox-outline" size={22} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.optionText}>Send us a message</ThemedText>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Help Option */}
        <TouchableOpacity style={styles.optionButton} onPress={handleHelp}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="help-circle-outline" size={22} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.optionText}>Help</ThemedText>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Find Answer Option */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleFindAnswer}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="search-outline" size={22} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.optionText}>Find An Answer</ThemedText>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </UniversalBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomeSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  welcomeTitle: {
    paddingTop: 20,
    fontSize: 32,
    fontWeight: "700",
    color: "rgba(0, 102, 255, 1)",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});

export default HelpScreen;
