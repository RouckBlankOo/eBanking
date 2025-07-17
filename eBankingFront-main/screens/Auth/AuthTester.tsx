import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Text from "../../components/Text";
import { CONSTANTS } from "../../constants/index";
import { useAlert } from "../../context/AlertContext";
import { OnboardingBackground } from "../../components/UniversalBackground";

const AuthTester = () => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("TestPassword123!");
  const [fullName, setFullName] = useState("Test User");
  const [phoneNumber, setPhoneNumber] = useState("+1234567890");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [response, setResponse] = useState("");
  const { showSuccess, showError } = useAlert();

  const API_URL = CONSTANTS.API_URL_DEV || CONSTANTS.API_URL_PROD;

  const testHealthCheck = async () => {
    setLoading(true);
    setResponse("");
    try {
      console.log("Testing health check at:", `${API_URL}/health`);
      const res = await fetch(`${API_URL}/health`);
      console.log("Health check response status:", res.status);
      const data = await res.json();
      console.log("Health check response data:", data);
      setResponse(JSON.stringify(data, null, 2));
      if (res.ok) {
        showSuccess("Health Check", "Backend is running!");
      } else {
        showError("Health Check", "Backend error");
      }
    } catch (error: any) {
      console.error("Health check error:", error);
      setResponse(`Error: ${error.message}`);
      Alert.alert(
        "Error",
        "Cannot connect to backend. Make sure it's running on port 4022"
      );
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setResponse("");
    try {
      console.log("Testing registration at:", `${API_URL}/auth/register`);
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          password,
        }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      if (res.ok) {
        showSuccess(
          "Registration Success",
          "User registered! Check console for verification codes."
        );
      } else {
        Alert.alert(
          "Registration Error",
          data.message || "Registration failed"
        );
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setResponse(`Error: ${error.message}`);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResponse("");
    try {
      console.log("Testing login at:", `${API_URL}/auth/login`);
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("Login response status:", res.status);
      const data = await res.json();
      console.log("Login response data:", data);
      setResponse(JSON.stringify(data, null, 2));
      if (res.ok && data.token) {
        setToken(data.token);
        showSuccess("Success", "Login successful! Token saved.");
      } else {
        Alert.alert("Login Error", data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setResponse(`Error: ${error.message}`);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const testGetProfile = async () => {
    if (!token) {
      Alert.alert("Error", "Please login first to get a token");
      return;
    }

    setLoading(true);
    setResponse("");
    try {
      console.log("Testing get profile at:", `${API_URL}/user/profile`);
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      if (res.ok) {
        showSuccess("Success", "Profile retrieved successfully!");
      } else {
        Alert.alert("Profile Error", data.message || "Failed to get profile");
      }
    } catch (error: any) {
      console.error("Profile error:", error);
      setResponse(`Error: ${error.message}`);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingBackground style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Authentication Tester</Text>
        <Text style={styles.subtitle}>API URL: {API_URL}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Data</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tests</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={testHealthCheck}
            disabled={loading}
          >
            <Text style={styles.buttonText}>1. Test Health Check</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={testRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>2. Test Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={testLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>3. Test Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !token && styles.buttonDisabled]}
            onPress={testGetProfile}
            disabled={loading || !token}
          >
            <Text style={styles.buttonText}>4. Test Get Profile</Text>
          </TouchableOpacity>
        </View>

        {token && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Token</Text>
            <Text style={styles.token}>{token.substring(0, 50)}...</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text>Testing...</Text>
          </View>
        )}

        {response && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Response</Text>
            <Text style={styles.response}>{response}</Text>
          </View>
        )}
      </ScrollView>
    </OnboardingBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  token: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    fontFamily: "monospace",
    fontSize: 12,
  },
  response: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 5,
    fontFamily: "monospace",
    fontSize: 12,
    maxHeight: 200,
  },
  loading: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default AuthTester;
