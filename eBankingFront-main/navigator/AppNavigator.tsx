import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, View } from "react-native";
import CardsScreen from "../screens/Cards/CardsScreen";
import HomeScreen from "../screens/Dashboard/HomeScreen";
import TrophiesScreen from "../screens/Referral/TrophiesScreen";

// Define the type for the tab navigator's param list
type TabParamList = {
  Trophies: undefined;
  Home: undefined;
  Cards: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        lazy: true, // Enable lazy loading for better performance
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
        tabBarAllowFontScaling: false, // Prevent font scaling issues
        tabBarIcon: ({ focused }) => {
          // Home tab with special circular design
          if (route.name === "Home") {
            return (
              <View
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: 30,
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -20, // Extend above the tab bar
                  shadowColor: "#3B82F6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Image
                  source={require("@/assets/Icons/Home.png")}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: "#FFFFFF",
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }

          // Trophies tab
          if (route.name === "Trophies") {
            return (
              <Image
                source={require("@/assets/Icons/Trophie.png")}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? "#3B82F6" : "rgba(255, 255, 255, 0.6)",
                }}
                resizeMode="contain"
              />
            );
          }

          // Cards tab
          if (route.name === "Cards") {
            return (
              <Image
                source={require("@/assets/Icons/Card.png")}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? "#3B82F6" : "rgba(255, 255, 255, 0.6)",
                }}
                resizeMode="contain"
              />
            );
          }

          return null;
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
          borderTopWidth: 0,
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Trophies" component={TrophiesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
    </Tab.Navigator>
  );
}
