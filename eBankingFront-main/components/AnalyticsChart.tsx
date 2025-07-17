import React from "react";
import { StyleSheet, View } from "react-native";
import { EmptyState } from "./EmptyState";
import { ThemedText } from "./ThemedText";

export const AnalyticsChart: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState message="Nothing Yet" containerStyle={styles.emptyState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    position: "relative",
  },
  emptyState: {
    flex: 1,
    marginBottom: 20,
  },
  monthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  monthLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
  },
});
