import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomAlert from "../../components/CustomAlert";
import Text from "../../components/Text";

export default function ChangeCardNameScreen({ navigation, route }: any) {
  const { currentName } = route.params || {}; // Get current name from route params
  const [cardName, setCardName] = useState(currentName || ""); // Initialize with current name or empty string
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSave = () => {
    // TODO: Save card name logic (e.g., update parent state or API call)
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        type="success"
        title="Card name updated!"
        autoCloseDelay={1500}
        buttons={[]}
        onClose={() => setAlertVisible(false)}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Card Name</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>New Card Name</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder="Enter card name"
          placeholderTextColor="#888"
        />
        <LinearGradient
          colors={["#3B82F6", "#2563EB"]}
          style={styles.saveButton}
        >
          <TouchableOpacity style={styles.saveButtonInner} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#1E293B",
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(59,130,246,0.15)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  saveButtonInner: {
    paddingVertical: 14,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
