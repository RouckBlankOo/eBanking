import { ThemedCard, ThemedText } from "@/components/ThemedComponents";
import { BankingBackground } from "@/components/UniversalBackground";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function AccountsScreen() {
  // Example dynamic data
  const [accounts] = useState([
    { id: "1", name: "Personal Account", balance: "$1,200" },
    { id: "2", name: "Savings Account", balance: "$5,000" },
    { id: "3", name: "Business Account", balance: "$10,000" },
  ]);

  const theme = useTheme();

  const handleAccountPress = (accountName: string) => {
    alert(`You selected: ${accountName}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <BankingBackground style={styles.container}>
        {/* List of Accounts */}
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAccountPress(item.name)}>
              <ThemedCard style={styles.accountCard}>
                <ThemedText variant="default" style={styles.accountName}>
                  {item.name}
                </ThemedText>
                <ThemedText variant="secondary" style={styles.accountBalance}>
                  {item.balance}
                </ThemedText>
              </ThemedCard>
            </TouchableOpacity>
          )}
        />
      </BankingBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  accountCard: {
    marginBottom: 10,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accountBalance: {
    fontSize: 16,
    marginTop: 5,
  },
});
