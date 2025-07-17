import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCountryFlag } from "./CountrySelector";

interface CountryInputProps {
  label: string;
  selectedCountry: string;
  onPress: () => void;
  style?: any;
}

const CountryInput: React.FC<CountryInputProps> = ({
  label,
  selectedCountry,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.inputGroup, style]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.countryContainer} onPress={onPress}>
        <View style={styles.countryContent}>
          <View style={styles.countryFlag}>
            <Text style={styles.flagEmoji}>
              {getCountryFlag(selectedCountry)}
            </Text>
          </View>
          <Text style={styles.countryText}>{selectedCountry}</Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color="rgba(255, 255, 255, 0.6)"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  countryContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countryFlag: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  flagEmoji: {
    fontSize: 18,
  },
  countryText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
});

export default CountryInput;
