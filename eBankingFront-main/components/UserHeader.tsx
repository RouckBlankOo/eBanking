import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";

interface UserHeaderProps {
  greetingText?: string;
  useProfileImage?: boolean;
  avatarSize?: number;
  style?: any;
  onProfilePress?: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  greetingText = "Welcome back!",
  useProfileImage = false,
  avatarSize = 40,
  style,
  onProfilePress,
}) => {
  const { user } = useUser();
  const userName = user?.fullName || "Guest";

  const avatarContent = useProfileImage ? (
    <Image
      source={require("../assets/Icons/DefaultProfile.png")}
      style={[
        styles.avatarImage,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 3,
        },
      ]}
      resizeMode="cover"
    />
  ) : (
    <View
      style={[
        styles.avatarContainer,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: avatarSize / 2.5 }]}>
        {userName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );

  return (
    <View style={[styles.headerLeft, style]}>
      {onProfilePress ? (
        <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7}>
          {avatarContent}
        </TouchableOpacity>
      ) : (
        avatarContent
      )}
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{greetingText}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarImage: {
    marginRight: 12,
  },
  avatarText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  textContainer: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
