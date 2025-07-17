import { ThemedText } from "@/components/ThemedComponents";
import { BankingBackground } from "@/components/UniversalBackground";
import { StyleSheet } from "react-native";

export default function TransfersScreen() {
  return (
    <BankingBackground style={styles.container}>
      <ThemedText variant="title">Transfers Screen</ThemedText>
    </BankingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
