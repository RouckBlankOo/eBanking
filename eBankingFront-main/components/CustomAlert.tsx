import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Text from "./Text";
import { SuccessIcon } from "./LottieIcon";

const { width: screenWidth } = Dimensions.get("window");

export type AlertType = "success" | "error" | "warning" | "info" | "confirm";

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

export interface CustomAlertProps {
  visible: boolean;
  type: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  autoCloseDelay?: number; // Auto close after X milliseconds
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type,
  title,
  message,
  buttons = [{ text: "OK", style: "default" }],
  onClose,
  autoCloseDelay,
}) => {
  const [isVisible, setIsVisible] = React.useState(visible);

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  React.useEffect(() => {
    setIsVisible(visible);

    // Auto close functionality
    if (visible && autoCloseDelay && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [visible, autoCloseDelay, handleClose]);

  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.();
    if (button.style !== "cancel") {
      handleClose();
    } else {
      handleClose();
    }
  };

  const getIconConfig = () => {
    switch (type) {
      case "success":
        return {
          name: "checkmark" as const,
          color: "#22C55E",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          borderColor: "#22C55E",
        };
      case "error":
        return {
          name: "close" as const,
          color: "#EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderColor: "#EF4444",
        };
      case "warning":
        return {
          name: "warning" as const,
          color: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.2)",
          borderColor: "#F59E0B",
        };
      case "info":
        return {
          name: "information-circle" as const,
          color: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "#3B82F6",
        };
      case "confirm":
        return {
          name: "help-circle" as const,
          color: "#8B5CF6",
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          borderColor: "#8B5CF6",
        };
      default:
        return {
          name: "information-circle" as const,
          color: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "#3B82F6",
        };
    }
  };

  const iconConfig = getIconConfig();

  const getButtonStyle = (buttonStyle: string) => {
    switch (buttonStyle) {
      case "destructive":
        return {
          colors: ["#EF4444", "#DC2626"] as const,
          textColor: "#FFFFFF",
        };
      case "cancel":
        return {
          colors: [
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.05)",
          ] as const,
          textColor: "#FFFFFF",
        };
      default:
        return {
          colors: ["#3B82F6", "#2563EB"] as const,
          textColor: "#FFFFFF",
        };
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <BlurView style={styles.modalOverlay} intensity={20} tint="dark">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View
              style={
                type === "success"
                  ? styles.successModalContainer
                  : styles.alertContainer
              }
            >
              {/* Icon */}
              <View
                style={
                  type === "success"
                    ? styles.successIconContainer
                    : styles.iconContainer
                }
              >
                <View
                  style={[
                    type === "success"
                      ? styles.successIconCircle
                      : styles.iconCircle,
                    type !== "success" && {
                      backgroundColor: iconConfig.backgroundColor,
                      borderColor: iconConfig.borderColor,
                    },
                  ]}
                >
                  {type === "success" ? (
                    <SuccessIcon size={60} />
                  ) : (
                    <Ionicons
                      name={iconConfig.name}
                      size={32}
                      color={iconConfig.color}
                    />
                  )}
                </View>
              </View>

              {/* Title */}
              <Text
                style={type === "success" ? styles.successTitle : styles.title}
              >
                {title}
              </Text>

              {/* Message */}
              {message && (
                <Text
                  style={
                    type === "success" ? styles.successMessage : styles.message
                  }
                >
                  {message}
                </Text>
              )}

              {/* Buttons - Only show for non-success or if explicitly provided */}
              {(type !== "success" || buttons.length > 0) && (
                <View style={styles.buttonsContainer}>
                  {buttons.map((button, index) => {
                    const buttonStyle = getButtonStyle(
                      button.style || "default"
                    );
                    return (
                      <LinearGradient
                        key={index}
                        colors={buttonStyle.colors}
                        style={[
                          styles.button,
                          buttons.length > 1 &&
                            index === 0 &&
                            styles.buttonMarginRight,
                          {
                            flex: buttons.length > 1 ? 1 : 0,
                            minWidth: buttons.length === 1 ? 120 : 0,
                          },
                        ]}
                      >
                        <TouchableOpacity
                          style={styles.buttonInner}
                          onPress={() => handleButtonPress(button)}
                        >
                          <Text
                            style={[
                              styles.buttonText,
                              { color: buttonStyle.textColor },
                            ]}
                          >
                            {button.text}
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    );
                  })}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: "rgba(15, 23, 42, 0.98)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: screenWidth * 0.8,
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    marginBottom: 18,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonMarginRight: {
    marginRight: 12,
  },
  buttonInner: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  // Success-specific styles - Compact and modern design
  successModalContainer: {
    backgroundColor: "rgba(15, 23, 42, 0.98)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: screenWidth * 0.75,
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  successMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 4,
  },
});

export default CustomAlert;
