// import { ThemedText } from "@/components/ThemedText";
// import { OnboardingBackground } from "@/components/UniversalBackground";
// import { useTheme } from "@/hooks/useTheme";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   NavigationProp,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { BlurView } from "expo-blur";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Snackbar } from "react-native-paper";
// import { CONSTANTS } from "../constants/index";
// import { RootStackParamList } from "../types";

// const { width } = Dimensions.get("window");
// const API_URL = CONSTANTS.API_URL_PROD;

// const VerifyPhoneScreen = () => {
//   const [isLoading, setLoading] = useState(false);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const route = useRoute();
//   const theme = useTheme();
//   const { userId, phoneNumber } = route.params as {
//     userId: string;
//     phoneNumber: string;
//   };

//   const handleCreateAccount = async () => {
//     setSnackbarVisible(false);
//     setSnackbarMessage("");
//     setLoading(true);

//     try {
//       console.log("Sending verification code to:", phoneNumber);

//       const response = await fetch(`${API_URL}/auth/send-verification`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           phoneNumber: phoneNumber,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to send verification code");
//       }

//       console.log("Verification code sent successfully");
//       setSnackbarMessage("Verification code sent to your phone!");
//       setSnackbarVisible(true);

//       // Navigate to actual OTP verification screen or dashboard
//       navigation.navigate("Login");
//     } catch (error: any) {
//       console.error("Verification error:", error);
//       setSnackbarMessage(error.message || "Something went wrong");
//       setSnackbarVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <OnboardingBackground style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
//       </TouchableOpacity>

//       <BlurView intensity={0.2} style={styles.blurContainer}>
//         {/* Title */}
//         <ThemedText type="title" style={styles.title}>
//           Let&apos;s get started!
//         </ThemedText>

//         {/* Description */}
//         <ThemedText style={styles.description}>
//           We&apos;ll send a confirmation code to{"\n"}the number below
//         </ThemedText>

//         {/* Phone Number Display */}
//         <View style={styles.phoneNumberContainer}>
//           <Ionicons
//             name="call"
//             size={20}
//             color="rgba(255, 255, 255, 0.6)"
//             style={styles.phoneIcon}
//           />
//           <ThemedText style={styles.phoneNumber}>
//             {phoneNumber || "+216 99 999 999"}
//           </ThemedText>
//         </View>

//         {/* Create Account Button */}
//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color={theme.colors.primary[500]}
//             style={styles.loadingIndicator}
//           />
//         ) : (
//           <TouchableOpacity
//             style={styles.createAccountButton}
//             onPress={handleCreateAccount}
//           >
//             <ThemedText style={styles.createAccountButtonText}>
//               Create Account
//             </ThemedText>
//           </TouchableOpacity>
//         )}

//         {/* Login Link */}
//         <View style={styles.loginSection}>
//           <ThemedText style={styles.loginText}>
//             Already have an account?{" "}
//           </ThemedText>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <ThemedText style={styles.loginLink}>Log in</ThemedText>
//           </TouchableOpacity>
//         </View>
//       </BlurView>

//       {/* Snackbar */}
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={5000}
//         style={styles.snackbar}
//       >
//         {snackbarMessage}
//       </Snackbar>
//     </OnboardingBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   backButton: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     zIndex: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   blurContainer: {
//     width: width * 0.9,
//     maxWidth: 400,
//     padding: 32,
//     borderRadius: 24,
//     backgroundColor: "rgba(255, 255, 255, 0.12)",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.25)",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     color: "rgba(255, 255, 255, 0.8)",
//     textAlign: "center",
//     lineHeight: 24,
//     marginBottom: 40,
//   },
//   phoneNumberContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.08)",
//     borderRadius: 16,
//     paddingHorizontal: 20,
//     paddingVertical: 18,
//     marginBottom: 40,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.15)",
//     width: "100%",
//   },
//   phoneIcon: {
//     marginRight: 12,
//   },
//   phoneNumber: {
//     fontSize: 18,
//     color: "#FFFFFF",
//     fontWeight: "600",
//   },
//   createAccountButton: {
//     backgroundColor: "#007AFF",
//     borderRadius: 16,
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 24,
//     shadowColor: "#007AFF",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   createAccountButtonText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
//   loadingIndicator: {
//     marginBottom: 24,
//   },
//   loginSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loginText: {
//     fontSize: 16,
//     color: "rgba(255, 255, 255, 0.7)",
//   },
//   loginLink: {
//     fontSize: 16,
//     color: "#007AFF",
//     fontWeight: "600",
//   },
//   snackbar: {
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
// });

// export default VerifyPhoneScreen;
