import { useState, useCallback } from 'react';
import { AlertType, AlertButton } from '../components/CustomAlert';

export interface AlertConfig {
  type: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  autoCloseDelay?: number;
}

export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setIsVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsVisible(false);
    setAlertConfig(null);
  }, []);

  // Predefined alert methods for common use cases
  const showSuccess = useCallback((title: string, message?: string, autoCloseDelay?: number) => {
    showAlert({
      type: 'success',
      title,
      message,
      autoCloseDelay,
      buttons: [{ text: 'OK', style: 'default' }],
    });
  }, [showAlert]);

  const showError = useCallback((title: string, message?: string) => {
    showAlert({
      type: 'error',
      title,
      message,
      buttons: [{ text: 'OK', style: 'default' }],
    });
  }, [showAlert]);

  const showWarning = useCallback((title: string, message?: string) => {
    showAlert({
      type: 'warning',
      title,
      message,
      buttons: [{ text: 'OK', style: 'default' }],
    });
  }, [showAlert]);

  const showInfo = useCallback((title: string, message?: string) => {
    showAlert({
      type: 'info',
      title,
      message,
      buttons: [{ text: 'OK', style: 'default' }],
    });
  }, [showAlert]);

  const showConfirm = useCallback((
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ) => {
    showAlert({
      type: 'confirm',
      title,
      message,
      buttons: [
        { text: cancelText, style: 'cancel', onPress: onCancel },
        { text: confirmText, style: 'default', onPress: onConfirm },
      ],
    });
  }, [showAlert]);

  const showDestructiveConfirm = useCallback((
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText: string = 'Delete',
    cancelText: string = 'Cancel'
  ) => {
    showAlert({
      type: 'warning',
      title,
      message,
      buttons: [
        { text: cancelText, style: 'cancel', onPress: onCancel },
        { text: confirmText, style: 'destructive', onPress: onConfirm },
      ],
    });
  }, [showAlert]);

  return {
    // State
    alertConfig,
    isVisible,
    
    // Methods
    showAlert,
    hideAlert,
    
    // Predefined methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showDestructiveConfirm,
  };
};

// Utility function to replace React Native's Alert.alert
export const customAlert = {
  alert: (title: string, message?: string, buttons?: AlertButton[]) => {
    // This would need to be implemented with a global state manager
    // For now, it's a placeholder for the hook usage
    console.warn('Use useCustomAlert hook instead of customAlert.alert');
  },
};
