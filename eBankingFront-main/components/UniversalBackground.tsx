/**
 * Universal Background Component
 * This component provides a consistent background with images/patterns for all screens
 */

import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface UniversalBackgroundProps extends ViewProps {
  children: React.ReactNode;
  variant?: "gradient" | "pattern" | "image" | "solid" | "banking";
  backgroundImage?: ImageSourcePropType;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function UniversalBackground({
  children,
  style,
  variant = "gradient",
  backgroundImage,
  overlay = false,
  overlayOpacity = 0.1,
  ...props
}: UniversalBackgroundProps) {
  const theme = useTheme();

  const renderBankingBackground = () => (
    <View style={[styles.container, styles.gradientBackground]} {...props}>
      {/* BlueShadow - Top Left */}
      <Image
        source={require("@/assets/objects/BlueShadow.png")}
        style={[styles.backgroundImage, styles.blueShadowPosition]}
        resizeMode="contain"
      />

      {/* Circle - Top Right */}
      <Image
        source={require("@/assets/objects/Circle.png")}
        style={[styles.backgroundImage, styles.circlePosition]}
        resizeMode="contain"
      />

      {/* Circlemini - Top Right (to the right of Circle) */}
      <Image
        source={require("@/assets/objects/Circlemini.png")}
        style={[styles.backgroundImage, styles.circleminiPosition]}
        resizeMode="contain"
      />

      {/* LightBlue - Middle Right */}
      <Image
        source={require("@/assets/objects/LightBlue.png")}
        style={[styles.backgroundImage, styles.lightBluePosition]}
        resizeMode="contain"
      />

      {/* WhiteShadow - Left Bottom */}
      <Image
        source={require("@/assets/objects/whiteShadow.png")}
        style={[styles.backgroundImage, styles.whiteShadowPosition]}
        resizeMode="contain"
      />

      {overlay && (
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: theme.colors.current.background,
              opacity: overlayOpacity,
            },
          ]}
        />
      )}

      <View style={[styles.content, style]}>{children}</View>
    </View>
  );

  const renderGradientBackground = () => (
    <View style={[styles.container, styles.gradientBackground]} {...props}>
      {/* Gradient circles for visual effect */}
      <View
        style={[
          styles.gradientCircle,
          styles.circle1,
          { backgroundColor: theme.colors.primary[500] + "15" },
        ]}
      />
      <View
        style={[
          styles.gradientCircle,
          styles.circle2,
          { backgroundColor: theme.colors.primary[400] + "10" },
        ]}
      />
      <View
        style={[
          styles.gradientCircle,
          styles.circle3,
          { backgroundColor: theme.colors.primary[600] + "08" },
        ]}
      />

      {overlay && (
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: theme.colors.current.background,
              opacity: overlayOpacity,
            },
          ]}
        />
      )}

      <View style={[styles.content, style]}>{children}</View>
    </View>
  );

  const renderPatternBackground = () => (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.current.background },
      ]}
      {...props}
    >
      {/* Geometric pattern */}
      <View style={styles.patternContainer}>
        {Array.from({ length: 20 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.patternDot,
              {
                backgroundColor: theme.colors.primary[500] + "05",
                left: (index % 5) * (width / 5),
                top: Math.floor(index / 5) * (height / 8),
              },
            ]}
          />
        ))}
      </View>

      {overlay && (
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: theme.colors.current.background,
              opacity: overlayOpacity,
            },
          ]}
        />
      )}

      <View style={[styles.content, style]}>{children}</View>
    </View>
  );

  const renderImageBackground = () => {
    if (!backgroundImage) {
      return renderGradientBackground();
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={[styles.container]}
        resizeMode="cover"
        {...props}
      >
        {overlay && (
          <View
            style={[
              styles.overlay,
              {
                backgroundColor: theme.colors.current.background,
                opacity: overlayOpacity,
              },
            ]}
          />
        )}

        <View style={[styles.content, style]}>{children}</View>
      </ImageBackground>
    );
  };

  const renderSolidBackground = () => (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.current.background },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );

  switch (variant) {
    case "pattern":
      return renderPatternBackground();
    case "image":
      return renderImageBackground();
    case "solid":
      return renderSolidBackground();
    case "banking":
      return renderBankingBackground();
    case "gradient":
    default:
      return renderGradientBackground();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradientBackground: {
    backgroundColor: "#050407", // Your dark background
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },

  // Gradient circles
  gradientCircle: {
    position: "absolute",
    borderRadius: 9999,
    zIndex: 1,
  },
  circle1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.4,
    right: -width * 0.4,
  },
  circle2: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: -width * 0.3,
    left: -width * 0.3,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.3,
    right: -width * 0.2,
  },

  // Pattern styles
  patternContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  patternDot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  // Background images positioning
  backgroundImage: {
    position: "absolute",
    zIndex: 1,
  },

  // BlueShadow - Top Left
  blueShadowPosition: {
    top: 10,
    left: -10,
    width: width * 0.55,
    height: width * 0.55,
  },

  // Circle - Top Right
  circlePosition: {
    top: 25,
    right: 10,
    width: width * 0.6,
    height: width * 0.6,
  },

  // Circlemini - Top Right (to the right of Circle)
  circleminiPosition: {
    top: 20,
    right: 55,
    width: width * 0.35,
    height: width * 0.35,
  },

  // LightBlue - Middle Right
  lightBluePosition: {
    top: height * 0.25,
    right: -1,
    width: width * 0.5,
    height: width * 0.5,
  },

  // WhiteShadow - Left Bottom
  whiteShadowPosition: {
    top: 300,
    left: -65,
    width: width * 0.7,
    height: width * 0.7,
  },
});

// Banking-specific background variants
export function BankingBackground({
  children,
  ...props
}: Omit<UniversalBackgroundProps, "variant">) {
  return (
    <UniversalBackground
      variant="gradient"
      overlay={true}
      overlayOpacity={0.05}
      {...props}
    >
      {children}
    </UniversalBackground>
  );
}

export function OnboardingBackground({
  children,
  ...props
}: Omit<UniversalBackgroundProps, "variant">) {
  return (
    <UniversalBackground variant="banking" overlay={false} {...props}>
      {children}
    </UniversalBackground>
  );
}

export function AuthBackground({
  children,
  ...props
}: Omit<UniversalBackgroundProps, "variant">) {
  return (
    <UniversalBackground
      variant="pattern"
      overlay={true}
      overlayOpacity={0.02}
      {...props}
    >
      {children}
    </UniversalBackground>
  );
}
