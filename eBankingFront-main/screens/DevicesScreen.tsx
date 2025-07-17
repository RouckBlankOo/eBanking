import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Text from "../components/Text";
import { useAlert } from "../context/AlertContext";
import { OnboardingBackground } from "../components/UniversalBackground";

const DevicesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { showInfo } = useAlert();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditDevice = () => {
    showInfo("Edit Device", "Device editing functionality coming soon");
  };

  return (
    <OnboardingBackground style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Devices</Text>
        <TouchableOpacity onPress={handleEditDevice} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Warning Banner */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIconContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
          </View>
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>
              If you detect any unusual activity, update your password
              immediately to ensure account security. After updating,
              you&apos;ll be logged out of all devices.
            </Text>
          </View>
        </View>

        {/* Current Device Card */}
        <View style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <Text style={styles.deviceName}>iPhone 15 Pro</Text>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current</Text>
            </View>
          </View>

          <View style={styles.deviceInfo}>
            <View style={styles.deviceInfoRow}>
              <Text style={styles.deviceInfoLabel}>Time</Text>
              <Text style={styles.deviceInfoValue}>2025-06-30 11:01:25</Text>
            </View>

            <View style={styles.deviceInfoRow}>
              <Text style={styles.deviceInfoLabel}>Location</Text>
              <Text style={styles.deviceInfoValue}>
                Tunisia, Siliana Governorate
              </Text>
            </View>

            <View style={styles.deviceInfoRow}>
              <Text style={styles.deviceInfoLabel}>IP Address</Text>
              <Text style={styles.deviceInfoValue}>41.226.103.44</Text>
            </View>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#1A1A1A",
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
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  warningBanner: {
    flexDirection: "row",
    backgroundColor: "rgba(196, 208, 224, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  warningIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  deviceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 16,
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
  },
  currentBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  deviceInfo: {
    gap: 16,
  },
  deviceInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceInfoLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "400",
  },
  deviceInfoValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },
  bottomPadding: {
    height: 40,
  },
});

export default DevicesScreen;
