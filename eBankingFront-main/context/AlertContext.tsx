import React, { createContext, useCallback, useContext, useState } from "react";
import CustomAlert, { AlertButton, AlertType } from "../components/CustomAlert";

export interface AlertConfig {
  type: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  autoCloseDelay?: number;
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  showSuccess: (
    title: string,
    message?: string,
    autoCloseDelay?: number
  ) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showConfirm: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => void;
  showDestructiveConfirm: (
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setIsVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setAlertConfig(null), 300); // Wait for animation to complete
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string, autoCloseDelay: number = 3000) => {
      showAlert({
        type: "success",
        title,
        message,
        autoCloseDelay,
        buttons: [], // No buttons for success alerts - they auto-close
      });
    },
    [showAlert]
  );

  const showError = useCallback(
    (title: string, message?: string) => {
      showAlert({
        type: "error",
        title,
        message,
        buttons: [{ text: "OK", style: "default" }],
      });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (title: string, message?: string) => {
      showAlert({
        type: "warning",
        title,
        message,
        buttons: [{ text: "OK", style: "default" }],
      });
    },
    [showAlert]
  );

  const showInfo = useCallback(
    (title: string, message?: string) => {
      showAlert({
        type: "info",
        title,
        message,
        buttons: [{ text: "OK", style: "default" }],
      });
    },
    [showAlert]
  );

  const showConfirm = useCallback(
    (
      title: string,
      message?: string,
      onConfirm?: () => void,
      onCancel?: () => void,
      confirmText: string = "Confirm",
      cancelText: string = "Cancel"
    ) => {
      showAlert({
        type: "confirm",
        title,
        message,
        buttons: [
          { text: cancelText, style: "cancel", onPress: onCancel },
          { text: confirmText, style: "default", onPress: onConfirm },
        ],
      });
    },
    [showAlert]
  );

  const showDestructiveConfirm = useCallback(
    (
      title: string,
      message?: string,
      onConfirm?: () => void,
      onCancel?: () => void,
      confirmText: string = "Logout",
      cancelText: string = "Cancel"
    ) => {
      showAlert({
        type: "warning",
        title,
        message,
        buttons: [
          { text: cancelText, style: "cancel", onPress: onCancel },
          { text: confirmText, style: "destructive", onPress: onConfirm },
        ],
      });
    },
    [showAlert]
  );

  const contextValue: AlertContextType = {
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showDestructiveConfirm,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alertConfig && (
        <CustomAlert
          visible={isVisible}
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={hideAlert}
          autoCloseDelay={alertConfig.autoCloseDelay}
        />
      )}
    </AlertContext.Provider>
  );
};
