# Theme System Documentation

This document explains how to use the comprehensive theme system implemented for the eBanking app.

## Overview

The theme system provides:

- Consistent colors with light/dark mode support
- Typography scales and font weights
- Spacing system
- Border radius standards
- Shadows and elevation
- Banking-specific design tokens
- Reusable themed components

## Files Structure

```
constants/
  ├── Theme.ts          # Main theme configuration
  └── Colors.ts         # (existing) Simple color definitions

hooks/
  └── useTheme.ts       # Theme hooks for components

components/
  └── ThemedComponents.tsx  # Pre-built themed components

screens/
  └── ForgotPasswordScreenThemed.tsx  # Example usage
```

## Usage

### Using the Theme Hook

```tsx
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.current.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.md,
      }}
    >
      <Text
        style={{
          color: theme.colors.current.text,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
        }}
      >
        Hello World
      </Text>
    </View>
  );
}
```

### Using Themed Components

```tsx
import {
  ThemedView,
  ThemedText,
  ThemedButton,
  ThemedInput,
  ThemedCard,
} from "@/components/ThemedComponents";

function MyScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedCard shadow="lg" padding="lg">
        <ThemedText variant="title">Welcome</ThemedText>
        <ThemedText variant="secondary">Enter your details below</ThemedText>

        <ThemedInput
          label="Email"
          placeholder="Enter your email"
          variant="outline"
        />

        <ThemedButton
          title="Continue"
          variant="primary"
          size="lg"
          onPress={() => {}}
        />
      </ThemedCard>
    </ThemedView>
  );
}
```

### Using Themed Styles Hook

```tsx
import { useThemedStyles } from "@/hooks/useTheme";

function MyComponent() {
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.current.background,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize["2xl"],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.current.text,
      marginBottom: theme.spacing.md,
    },
    card: {
      backgroundColor: theme.colors.current.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      ...theme.shadows.md,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Title</Text>
      <View style={styles.card}>{/* Content */}</View>
    </View>
  );
}
```

## Theme Structure

### Colors

#### Primary Colors

- `primary[50-900]` - Main brand colors
- `secondary[50-900]` - Secondary colors
- `success[50-900]` - Success states
- `warning[50-900]` - Warning states
- `error[50-900]` - Error states
- `neutral[50-900]` - Neutral grays

#### Banking Colors

- `banking.gold` - Premium accounts
- `banking.platinum` - Platinum cards
- `banking.mint` - Transfers and deposits

#### Theme Colors (Light/Dark)

- `current.background` - Main background
- `current.surface` - Surface color
- `current.card` - Card backgrounds
- `current.text` - Primary text
- `current.textSecondary` - Secondary text
- `current.border` - Borders

### Typography

```tsx
theme.typography.fontSize.xs; // 12px
theme.typography.fontSize.sm; // 14px
theme.typography.fontSize.base; // 16px
theme.typography.fontSize.lg; // 18px
theme.typography.fontSize.xl; // 20px
theme.typography.fontSize["2xl"]; // 24px

theme.typography.fontWeight.light; // 300
theme.typography.fontWeight.normal; // 400
theme.typography.fontWeight.medium; // 500
theme.typography.fontWeight.bold; // 700
```

### Spacing

```tsx
theme.spacing.xs; // 4px
theme.spacing.sm; // 8px
theme.spacing.md; // 16px
theme.spacing.lg; // 24px
theme.spacing.xl; // 32px
theme.spacing["2xl"]; // 48px
```

### Border Radius

```tsx
theme.borderRadius.sm; // 4px
theme.borderRadius.md; // 8px
theme.borderRadius.lg; // 12px
theme.borderRadius.xl; // 16px
theme.borderRadius.full; // 9999px (circular)
```

### Shadows

```tsx
theme.shadows.sm; // Subtle shadow
theme.shadows.md; // Medium shadow
theme.shadows.lg; // Large shadow
theme.shadows.xl; // Extra large shadow
```

## Themed Components API

### ThemedView

```tsx
<ThemedView
  variant="default" | "surface" | "card"
  shadow="sm" | "md" | "lg" | "xl"
/>
```

### ThemedText

```tsx
<ThemedText
  variant="default" | "secondary" | "tertiary" | "title" | "subtitle" | "caption"
  size="xs" | "sm" | "base" | "lg" | "xl" | "2xl"
  weight="light" | "normal" | "medium" | "bold"
/>
```

### ThemedButton

```tsx
<ThemedButton
  variant="primary" | "secondary" | "outline" | "ghost" | "success" | "warning" | "error"
  size="sm" | "md" | "lg"
  title="Button Text"
  loading={boolean}
/>
```

### ThemedInput

```tsx
<ThemedInput
  variant="default" | "outline" | "filled"
  size="sm" | "md" | "lg"
  label="Input Label"
  helperText="Helper text"
  error={boolean}
/>
```

### ThemedCard

```tsx
<ThemedCard
  shadow="sm" | "md" | "lg" | "xl"
  padding="sm" | "md" | "lg"
/>
```

## Banking-Specific Theming

### Account Types

```tsx
theme.banking.accountTypes.checking;
theme.banking.accountTypes.savings;
theme.banking.accountTypes.credit;
theme.banking.accountTypes.investment;
```

### Transaction Types

```tsx
theme.banking.transactionTypes.income;
theme.banking.transactionTypes.expense;
theme.banking.transactionTypes.transfer;
```

### Card Types

```tsx
theme.banking.cardTypes.visa;
theme.banking.cardTypes.mastercard;
theme.banking.cardTypes.amex;
theme.banking.cardTypes.discover;
```

## Migration Guide

To migrate existing screens to use the theme system:

1. Import the theme hook:

   ```tsx
   import { useTheme } from "@/hooks/useTheme";
   ```

2. Replace hardcoded styles with theme values:

   ```tsx
   // Before
   backgroundColor: "#fff";

   // After
   backgroundColor: theme.colors.current.background;
   ```

3. Use themed components where possible:

   ```tsx
   // Before
   <View style={{ backgroundColor: '#fff' }}>
     <Text style={{ color: '#333', fontSize: 24 }}>Title</Text>
   </View>

   // After
   <ThemedView>
     <ThemedText variant="title">Title</ThemedText>
   </ThemedView>
   ```

## Best Practices

1. **Use themed components** when possible for consistency
2. **Access theme values** through the useTheme hook
3. **Follow the spacing scale** instead of arbitrary values
4. **Use semantic color names** (current.text vs hardcoded colors)
5. **Test both light and dark modes** when implementing features
6. **Use banking-specific colors** for financial UI elements

## Example: Complete Screen Migration

See `screens/ForgotPasswordScreenThemed.tsx` for a complete example of migrating an existing screen to use the theme system.
