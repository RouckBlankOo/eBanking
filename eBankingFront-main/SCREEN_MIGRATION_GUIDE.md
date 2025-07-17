# Screen Migration Script

This script helps you quickly apply the theme system to all your screens.

## Screens Updated ✅

- [x] ForgotPasswordScreen.tsx (example created as ForgotPasswordScreenThemed.tsx)
- [x] LoginScreen.tsx (partially updated)
- [x] SignUpScreen.tsx (updated)
- [x] DashboardScreen.tsx (updated)

## Screens To Update 📝

- [ ] HomeScreen.tsx
- [ ] ProfileScreen.tsx
- [ ] AccountsScreen.tsx
- [ ] CardsScreen.tsx
- [ ] CoinWalletScreen.tsx
- [ ] TransfersScreen.tsx
- [ ] OnBoardingScreen.tsx
- [ ] VerifyPhoneScreen.tsx

## Quick Migration Template

For each screen, follow this pattern:

### 1. Update Imports

```tsx
// Before
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// After
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
  ThemedInput,
  ThemedCard,
} from "@/components/ThemedComponents";
import { useTheme } from "@/hooks/useTheme";
```

### 2. Add Theme Hook

```tsx
const YourScreen = () => {
  const theme = useTheme();
  // ... rest of component
```

### 3. Replace Components

```tsx
// Before
<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
  <TextInput style={styles.input} placeholder="Input" />
  <TouchableOpacity style={styles.button} onPress={handlePress}>
    <Text style={styles.buttonText}>Button</Text>
  </TouchableOpacity>
</View>

// After
<ThemedView style={styles.container}>
  <ThemedText variant="title">Title</ThemedText>
  <ThemedInput placeholder="Input" variant="outline" />
  <ThemedButton title="Button" variant="primary" onPress={handlePress} />
</ThemedView>
```

### 4. Update Styles

```tsx
// Before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#6a5acd",
    padding: 15,
    borderRadius: 8,
  },
});

// After
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Or use theme.spacing.lg
  },
  // Remove title styles (handled by ThemedText variant)
  // Remove button styles (handled by ThemedButton)
});
```

## Color Replacements

Replace these hardcoded colors with theme values:

| Old Color      | New Theme Value                      |
| -------------- | ------------------------------------ |
| `#fff`         | `theme.colors.current.background`    |
| `#333`, `#000` | `theme.colors.current.text`          |
| `#666`         | `theme.colors.current.textSecondary` |
| `#aaa`         | `theme.colors.current.textTertiary`  |
| `#6a5acd`      | `theme.colors.primary[500]`          |
| `#ccc`         | `theme.colors.current.border`        |

## Component Mapping

| Old React Native | New Themed Component |
| ---------------- | -------------------- |
| `View` →         | `ThemedView`         |
| `Text` →         | `ThemedText`         |
| `TextInput` →    | `ThemedInput`        |
| Button →         | `ThemedButton`       |
| Card Container → | `ThemedCard`         |

## Next Steps

1. Update remaining screens using this template
2. Test both light and dark modes
3. Adjust spacing using theme.spacing values
4. Use banking-specific colors for financial elements

## Banking-Specific Theming

For banking screens, use these special colors:

- Account balances: `theme.banking.accountTypes.checking.color`
- Success transactions: `theme.colors.success[500]`
- Error states: `theme.colors.error[500]`
- Cards: `theme.banking.cardTypes.visa.gradient`
