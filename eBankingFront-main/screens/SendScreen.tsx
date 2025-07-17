import React, { useState, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingBackground } from "../components/UniversalBackground";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Text from "../components/Text";
import { SectionContainer } from "../components/SectionContainer";
import UniversalList, { ListItem } from "../components/UniversalList";

// Tab type definition
type TabType = "phone" | "email" | "uid";

export default function SendScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  // State
  const [selectedTab, setSelectedTab] = useState<TabType>("phone");
  const [inputValue, setInputValue] = useState("");

  // Mock data for examples
  const phoneExample = "99 999 999";
  const emailExample = "example@gmail.com";
  const uidExample = "176762098";

  // Recent payees mock data (wrapped in useMemo to avoid recreation on every render)
  const recentPayees = useMemo(
    () => [
      {
        id: "payee-1",
        name: "Sarah Johnson",
        value: "sarah@example.com",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
      {
        id: "payee-2",
        name: "Mike Smith",
        value: "99 123 4567",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
      {
        id: "payee-3",
        name: "David Chen",
        value: "1234567890",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
      {
        id: "payee-4",
        name: "Emma Wilson",
        value: "emma@example.com",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
      {
        id: "payee-5",
        name: "Alex Morgan",
        value: "99 987 6543",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
      {
        id: "payee-6",
        name: "Lisa Taylor",
        value: "lisa@example.com",
        profileImage: require("@/assets/Icons/DefaultProfile.png"),
      },
    ],
    []
  );

  // Navigation handler
  const handleBack = () => {
    navigation.goBack();
  };

  // Tab handlers
  const handleTabPress = (tab: TabType) => {
    setSelectedTab(tab);
    setInputValue(""); // Clear input when switching tabs
    Keyboard.dismiss();
  };

  // Handle next button press
  const handleNext = () => {
    // Navigate to the transfer amount screen
    if (inputValue.trim() !== "") {
      navigation.navigate("TransferAmount", {
        recipientType: selectedTab,
        recipientValue: inputValue,
      });
    }
  };

  // Get the example value to display based on selected tab
  const getExampleValue = (): string => {
    switch (selectedTab) {
      case "phone":
        return phoneExample;
      case "email":
        return emailExample;
      case "uid":
        return uidExample;
      default:
        return "";
    }
  };

  // Handle recipient selection
  const handleRecipientSelect = (value: string) => {
    setInputValue(value);
    // Auto navigate when a recipient is selected
    setTimeout(() => {
      navigation.navigate("TransferAmount", {
        recipientType: selectedTab,
        recipientValue: value,
      });
    }, 100);
  };

  // Filter payees based on the selected tab
  const filteredPayees = useMemo(() => {
    switch (selectedTab) {
      case "email":
        return recentPayees.filter((payee) => payee.value.includes("@"));
      case "phone":
        return recentPayees.filter(
          (payee) =>
            !payee.value.includes("@") &&
            !isNaN(parseInt(payee.value.replace(/\s/g, "")))
        );
      case "uid":
        return recentPayees.filter(
          (payee) =>
            !payee.value.includes("@") &&
            !isNaN(parseInt(payee.value.replace(/\s/g, "")))
        );
      default:
        return recentPayees;
    }
  }, [selectedTab, recentPayees]);

  // Convert payees to list items for UniversalList
  const payeeListItems: ListItem[] = useMemo(() => {
    return filteredPayees.map((payee) => ({
      id: payee.id,
      title: payee.name,
      subtitle: payee.value,
      icon:
        selectedTab === "email"
          ? "mail"
          : selectedTab === "phone"
          ? "call"
          : "person",
      onPress: () => handleRecipientSelect(payee.value),
    }));
  }, [filteredPayees, selectedTab]);

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />

      <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* New Payee Section */}
        <SectionContainer
          title="New Payee"
          titleOutside={true}
          containerStyle={styles.sectionContainerStyle}
        >
          {/* Tab Selector */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "phone" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("phone")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "phone" && styles.activeTabText,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "email" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("email")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "email" && styles.activeTabText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "uid" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("uid")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "uid" && styles.activeTabText,
                ]}
              >
                UID
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              {selectedTab === "phone" && (
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>🇹🇳</Text>
                </View>
              )}

              <TextInput
                ref={inputRef}
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={getExampleValue()}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                keyboardType={
                  selectedTab === "phone" || selectedTab === "uid"
                    ? "number-pad"
                    : "email-address"
                }
                autoCapitalize={selectedTab === "email" ? "none" : "sentences"}
              />

              {inputValue ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setInputValue("")}
                >
                  <View style={styles.clearButtonInner}>
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                !inputValue && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!inputValue}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </SectionContainer>

        {/* Recent Payees Section */}
        <SectionContainer
          title="Recent Payees"
          titleOutside={true}
          containerStyle={styles.sectionContainerStyle}
        >
          <UniversalList
            items={payeeListItems}
            containerStyle={styles.payeesList}
          />
        </SectionContainer>
      </View>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 1000,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerSpacer: {
    width: 40,
  },
  sectionContainerStyle: {
    marginTop: 0,
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 50,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
  },
  activeTabButton: {
    backgroundColor: "#0070F3",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(21, 25, 32, 0.6)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  countryCode: {
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    padding: 4,
  },
  nextButton: {
    backgroundColor: "#0070F3",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "rgba(0, 112, 243, 0.5)",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  payeesList: {
    maxHeight: 420,
  },
});
