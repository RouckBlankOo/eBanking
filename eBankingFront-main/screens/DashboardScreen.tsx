import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CardsScreen from "./CardsScreen";
import CoinWalletScreen from "./CoinWalletScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

// Define valid icon names for TypeScript
type IconName = "home" | "person" | "wallet" | "card";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName = "home"; // Default fallback
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "CoinWallet") {
            iconName = "wallet";
          } else if (route.name === "Cards") {
            iconName = "card";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.current.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.current.background,
          borderTopColor: theme.colors.current.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="CoinWallet" component={CoinWalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
