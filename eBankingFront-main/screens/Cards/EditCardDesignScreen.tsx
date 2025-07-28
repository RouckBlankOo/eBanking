import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomAlert from "../../components/CustomAlert";
import Text from "../../components/Text";

export default function EditCardDesignScreen({ navigation, route }: any) {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSave = () => {
    // TODO: Save card design logic
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
        title="Card design updated!"
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
        <Text style={styles.headerTitle}>Edit Card Design</Text>
      </View>
      <View style={styles.content}>
        {/* TODO: Add card design editing UI here */}
        <LinearGradient
          colors={["#8B5CF6", "#7C3AED"]}
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
    backgroundColor: "rgba(139,92,246,0.15)",
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
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 24,
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
