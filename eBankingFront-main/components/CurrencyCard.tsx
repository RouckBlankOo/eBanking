import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface CurrencyCardProps {
  symbol: string;
  iconSource: ImageSourcePropType;
  name: string;
  balance: string;
  percentage: string;
  onPress?: () => void;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({
  symbol,
  iconSource,
  name,
  balance,
  percentage,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.glow} />
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={iconSource} style={styles.icon} resizeMode="contain" />
        </View>
        <ThemedText style={styles.name}>{name}</ThemedText>
      </View>
      <ThemedText style={styles.balance}>${balance}</ThemedText>
      <View style={styles.footer}>
        <ThemedText style={styles.percentage}>{percentage}</ThemedText>
        <View
          style={[
            styles.indicator,
            {
              backgroundColor:
                percentage === "0%" ? "rgba(255, 255, 255, 0.3)" : "#00D4AA",
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    minWidth: 110,
    height: 120,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 12,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  icon: {
    width: 24,
    height: 24,
  },
  name: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    flex: 1,
  },
  balance: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  percentage: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
