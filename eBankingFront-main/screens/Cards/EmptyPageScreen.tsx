import React from "react";
import { Text, View } from "react-native";

export default function EmptyPageScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, color: "#333" }}>Empty Page</Text>
    </View>
  );
}
