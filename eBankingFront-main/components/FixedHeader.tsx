import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserHeader } from "./UserHeader";
import Text from "./Text";

interface FixedHeaderProps {
  greetingText?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  rightContent?: React.ReactNode;
  style?: any;
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({
  greetingText = "Welcome back!",
  showNotifications = true,
  notificationCount = 0,
  onNotificationPress,
  onProfilePress,
  rightContent,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.fixedHeader, { paddingTop: insets.top + 16 }, style]}>
      <View style={styles.headerContent}>
        <UserHeader
          greetingText={greetingText}
          useProfileImage={true}
          avatarSize={65}
          onProfilePress={onProfilePress}
        />

        {rightContent ||
          (showNotifications && (
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>
                    {notificationCount > 99
                      ? "99+"
                      : notificationCount.toString()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "rgba(29, 36, 45, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingBottom: 16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
