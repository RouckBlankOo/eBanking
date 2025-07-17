/**
 * Reusable styled components using the theme system
 */

import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Text from "./Text";

// Themed View Component
interface ThemedViewProps extends ViewProps {
  variant?: "default" | "surface" | "card";
  shadow?: keyof typeof import("@/constants/Theme").Shadows;
}

export function ThemedView({
  style,
  variant = "default",
  shadow,
  ...props
}: ThemedViewProps) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "surface":
        return theme.colors.current.surface;
      case "card":
        return theme.colors.current.card;
      default:
        return theme.colors.current.background;
    }
  };

  const themedStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    ...(shadow && theme.shadows[shadow]),
  };

  return <View style={[themedStyle, style]} {...props} />;
}

// Themed Text Component
interface ThemedTextProps extends TextProps {
  variant?:
    | "default"
    | "secondary"
    | "tertiary"
    | "title"
    | "subtitle"
    | "caption";
  size?: keyof typeof import("@/constants/Theme").Typography.fontSize;
  weight?: keyof typeof import("@/constants/Theme").Typography.fontWeight;
}

export function ThemedText({
  style,
  variant = "default",
  size,
  weight,
  ...props
}: ThemedTextProps) {
  const theme = useTheme();

  const getTextColor = () => {
    switch (variant) {
      case "secondary":
        return theme.colors.current.textSecondary;
      case "tertiary":
        return theme.colors.current.textTertiary;
      case "title":
        return theme.colors.current.text;
      case "subtitle":
        return theme.colors.current.textSecondary;
      case "caption":
        return theme.colors.current.textTertiary;
      default:
        return theme.colors.current.text;
    }
  };

  const getFontSize = () => {
    if (size) return theme.typography.fontSize[size];

    switch (variant) {
      case "title":
        return theme.typography.fontSize["2xl"];
      case "subtitle":
        return theme.typography.fontSize.lg;
      case "caption":
        return theme.typography.fontSize.sm;
      default:
        return theme.typography.fontSize.base;
    }
  };

  const getFontWeight = () => {
    if (weight) return theme.typography.fontWeight[weight];

    switch (variant) {
      case "title":
        return theme.typography.fontWeight.bold;
      case "subtitle":
        return theme.typography.fontWeight.medium;
      default:
        return theme.typography.fontWeight.normal;
    }
  };

  const themedStyle: TextStyle = {
    color: getTextColor(),
    fontSize: getFontSize(),
    fontWeight: getFontWeight() as TextStyle["fontWeight"],
  };

  return <Text style={[themedStyle, style]} {...props} />;
}

// Themed Button Component
interface ThemedButtonProps extends TouchableOpacityProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  title: string;
  loading?: boolean;
}

export function ThemedButton({
  style,
  variant = "primary",
  size = "md",
  title,
  loading = false,
  disabled,
  ...props
}: ThemedButtonProps) {
  const theme = useTheme();

  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      ...theme.components.button.padding[size],
      height: theme.components.button.height[size],
    };

    if (disabled || loading) {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.current.disabled,
      };
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary[500],
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.secondary[500],
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary[500],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      case "success":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.success[500],
        };
      case "warning":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.warning[500],
        };
      case "error":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.error[500],
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return theme.colors.current.textTertiary;
    }

    switch (variant) {
      case "outline":
      case "ghost":
        return theme.colors.primary[500];
      default:
        return "#ffffff";
    }
  };

  const buttonStyles = getButtonStyles();
  const textColor = getTextColor();

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      disabled={disabled || loading}
      {...props}
    >
      <ThemedText style={{ color: textColor }} weight="medium">
        {loading ? "Loading..." : title}
      </ThemedText>
    </TouchableOpacity>
  );
}

// Themed Input Component
interface ThemedInputProps extends TextInputProps {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  label?: string;
  helperText?: string;
}

export function ThemedInput({
  style,
  variant = "outline",
  size = "md",
  error = false,
  label,
  helperText,
  ...props
}: ThemedInputProps) {
  const theme = useTheme();

  const getInputStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      height: theme.components.input.height[size],
      paddingHorizontal: theme.components.input.padding.horizontal,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.current.text,
    };

    switch (variant) {
      case "outline":
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: error
            ? theme.colors.error[500]
            : theme.colors.current.border,
          backgroundColor: theme.colors.current.background,
        };
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.current.surface,
          borderWidth: 0,
        };
      default:
        return {
          ...baseStyle,
          borderBottomWidth: 1,
          borderBottomColor: error
            ? theme.colors.error[500]
            : theme.colors.current.border,
          backgroundColor: "transparent",
        };
    }
  };

  const inputStyles = getInputStyles();

  return (
    <View>
      {label && (
        <ThemedText
          variant="secondary"
          size="sm"
          weight="medium"
          style={{ marginBottom: theme.spacing.sm }}
        >
          {label}
        </ThemedText>
      )}
      <TextInput
        style={[inputStyles, style]}
        placeholderTextColor={theme.colors.current.placeholder}
        {...props}
      />
      {helperText && (
        <ThemedText
          variant={error ? "default" : "tertiary"}
          size="sm"
          style={{
            marginTop: theme.spacing.xs,
            color: error
              ? theme.colors.error[500]
              : theme.colors.current.textTertiary,
          }}
        >
          {helperText}
        </ThemedText>
      )}
    </View>
  );
}

// Themed Card Component
interface ThemedCardProps extends ViewProps {
  shadow?: keyof typeof import("@/constants/Theme").Shadows;
  padding?: keyof typeof import("@/constants/Theme").Components.card.padding;
}

export function ThemedCard({
  style,
  shadow = "md",
  padding = "md",
  children,
  ...props
}: ThemedCardProps) {
  const theme = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.current.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.components.card.padding[padding],
    ...theme.shadows[shadow],
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
}
