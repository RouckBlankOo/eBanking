# Universal Background Implementation Guide

## 🎨 Background Component Created

I've created a `UniversalBackground` component that provides consistent, beautiful backgrounds across all your screens with various options:

### Available Background Variants:

1. **Gradient Background** - Subtle gradient circles for visual depth
2. **Pattern Background** - Geometric dot patterns
3. **Image Background** - Custom image backgrounds
4. **Solid Background** - Simple solid colors

### Pre-configured Banking Backgrounds:

- `OnboardingBackground` - For onboarding/welcome screens
- `AuthBackground` - For login/signup screens
- `BankingBackground` - For main banking screens

## 🚀 How to Apply to All Screens

### Method 1: Individual Screen Updates

Update each screen by wrapping the content:

```tsx
// Before
import React from "react";
import { View, StyleSheet } from "react-native";

const YourScreen = () => {
  return <View style={styles.container}>{/* Your content */}</View>;
};

// After
import React from "react";
import { View, StyleSheet } from "react-native";
import { BankingBackground } from "@/components/UniversalBackground";

const YourScreen = () => {
  return (
    <BankingBackground>
      <View style={styles.container}>{/* Your content */}</View>
    </BankingBackground>
  );
};

// Remove backgroundColor from container styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: removed - handled by background component
  },
});
```

### Method 2: Global App-wide Background

Update your main App.tsx to apply background globally:

```tsx
// In App.tsx, wrap your NavigationContainer
import { UniversalBackground } from "./components/UniversalBackground";

export default function App() {
  return (
    <PaperProvider>
      <UniversalBackground variant="gradient">
        <NavigationContainer>
          <Stack.Navigator>{/* Your screens */}</Stack.Navigator>
        </NavigationContainer>
      </UniversalBackground>
    </PaperProvider>
  );
}
```

## 📱 Screen-Specific Recommendations

### Onboarding Screens

```tsx
import { OnboardingBackground } from "@/components/UniversalBackground";

<OnboardingBackground>{/* Your onboarding content */}</OnboardingBackground>;
```

### Auth Screens (Login, SignUp, ForgotPassword)

```tsx
import { AuthBackground } from "@/components/UniversalBackground";

<AuthBackground>{/* Your auth content */}</AuthBackground>;
```

### Banking Screens (Dashboard, Accounts, Cards, etc.)

```tsx
import { BankingBackground } from "@/components/UniversalBackground";

<BankingBackground>{/* Your banking content */}</BankingBackground>;
```

### Custom Image Background

```tsx
import { UniversalBackground } from "@/components/UniversalBackground";

<UniversalBackground
  variant="image"
  backgroundImage={require("@/assets/images/your-background.png")}
  overlay={true}
  overlayOpacity={0.1}
>
  {/* Your content */}
</UniversalBackground>;
```

## 🎛️ Customization Options

### Props Available:

- `variant`: 'gradient' | 'pattern' | 'image' | 'solid'
- `backgroundImage`: For image backgrounds
- `overlay`: Add overlay for better text readability
- `overlayOpacity`: Control overlay transparency (0-1)

### Examples:

```tsx
// Gradient with overlay
<UniversalBackground variant="gradient" overlay={true} overlayOpacity={0.1}>

// Pattern background
<UniversalBackground variant="pattern">

// Custom image
<UniversalBackground
  variant="image"
  backgroundImage={require("@/assets/images/bg.png")}
  overlay={true}
>

// Simple solid
<UniversalBackground variant="solid">
```

## ✅ Quick Implementation Checklist

1. **✅ OnBoardingScreen** - Already updated with `OnboardingBackground`
2. **⏳ LoginScreen** - Update with `AuthBackground`
3. **⏳ SignUpScreen** - Update with `AuthBackground`
4. **⏳ ForgotPasswordScreen** - Update with `AuthBackground`
5. **⏳ DashboardScreen** - Update with `BankingBackground`
6. **⏳ Other screens** - Choose appropriate background variant

## 🎨 Visual Effects Included

The gradient background includes:

- **Subtle animated circles** in your primary color (#0066FF)
- **Layered opacity** for depth
- **Responsive sizing** based on screen dimensions
- **Automatic theme adaptation** (light/dark mode support)

## 💡 Pro Tips

1. **Remove backgroundColor** from your screen styles after applying backgrounds
2. **Use overlay** for screens with lots of text for better readability
3. **Consistent variants** - Use same variant for similar screen types
4. **Test on both themes** - Backgrounds adapt to light/dark mode automatically

Your OnBoardingScreen now has a beautiful gradient background with subtle visual effects!
