import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppStatusBar = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <>
      <StatusBar style="light" backgroundColor="#000" translucent />
      {/* Status bar background overlay for black color */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: insets.top,
          backgroundColor: "#000",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default AppStatusBar;
