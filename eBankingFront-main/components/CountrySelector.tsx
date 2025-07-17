import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Text from "./Text";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SuccessIcon } from "./LottieIcon";

const { width, height } = Dimensions.get("window");

interface Country {
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: string) => void;
  selectedCountry: string;
  title?: string;
}

const countries: Country[] = [
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Montenegro", flag: "🇲🇪" },
  { name: "North Macedonia", flag: "🇲🇰" },
  { name: "Albania", flag: "🇦🇱" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Moldova", flag: "🇲🇩" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Georgia", flag: "🇬🇪" },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCountry,
  title = "Select Country",
}) => {
  const handleCountrySelect = (countryName: string) => {
    onSelect(countryName);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <BlurView intensity={20} style={styles.modalBlurView}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={countries}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleCountrySelect(item.name)}
                >
                  <Text style={styles.countryItemFlag}>{item.flag}</Text>
                  <Text style={styles.countryItemName}>{item.name}</Text>
                  {selectedCountry === item.name && <SuccessIcon size={20} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

// Helper function to get country flag by name
export const getCountryFlag = (countryName: string): string => {
  const country = countries.find((c) => c.name === countryName);
  return country ? country.flag : "🏳️";
};

// Helper function to get all countries (for external use)
export const getAllCountries = (): Country[] => {
  return countries;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBlurView: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  modalContent: {
    borderRadius: 16,
    width: width * 0.85,
    maxHeight: height * 0.7,
    backgroundColor: "rgba(30, 30, 30, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  countryItemFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryItemName: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default CountrySelector;
