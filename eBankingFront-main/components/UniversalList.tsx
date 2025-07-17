import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "./Text";

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

interface UniversalListProps {
  items: ListItem[];
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  showWarning?: boolean;
  warningText?: string;
  warningIcon?: keyof typeof Ionicons.glyphMap;
  warningColor?: string;
}

export default function UniversalList({
  items,
  containerStyle,
  itemStyle,
  showWarning = false,
  warningText,
  warningIcon = "warning",
  warningColor = "#F59E0B",
}: UniversalListProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Warning Section */}
      {showWarning && warningText && (
        <View
          style={[
            styles.warningContainer,
            { borderColor: `${warningColor}4D` },
          ]}
        >
          <Ionicons
            name={warningIcon}
            size={16}
            color={warningColor}
            style={styles.warningIcon}
          />
          <Text style={[styles.warningText, { color: warningColor }]}>
            {warningText}
          </Text>
        </View>
      )}

      {/* List Items */}
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.listItem,
            item.selected && styles.listItemSelected,
            item.disabled && styles.listItemDisabled,
            index === items.length - 1 && styles.lastListItem,
            itemStyle,
          ]}
          onPress={item.onPress}
          disabled={item.disabled}
          activeOpacity={0.8}
        >
          <View style={styles.listItemContent}>
            {item.icon && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={item.iconColor || "#3B82F6"}
                />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            {item.selected ? (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#0070F3"
                style={styles.selectedIcon}
              />
            ) : item.onPress ? (
              <Ionicons
                name="chevron-forward"
                size={16}
                color="rgba(255, 255, 255, 0.4)"
                style={styles.chevronIcon}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  listItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  lastListItem: {
    marginBottom: 0,
  },
  listItemSelected: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(59, 130, 246, 0.4)",
  },
  listItemDisabled: {
    opacity: 0.5,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 18,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  selectedIcon: {
    marginLeft: 8,
  },
});
