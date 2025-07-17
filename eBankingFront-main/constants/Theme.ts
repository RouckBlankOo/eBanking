/**
 * App Theme Configuration
 * This file contains all the design tokens for the eBanking app including colors, typography, spacing, and more.
 */

// Color Palette
export const Colors = {
  // Primary Colors
  primary: {
    20:'#0066FF', // 20% opacity for primary color
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#0066FF', // Main primary color
    600: '#0052cc',
    700: '#0043a3',
    800: '#003785',
    900: '#002966',
  },
  
  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Banking specific colors
  banking: {
    gold: '#FFD700',
    darkGold: '#DAA520',
    platinum: '#E5E4E2',
    bronze: '#CD7F32',
    mint: '#00D4AA',
    darkMint: '#00B894',
  },
  
  // Light Theme
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#cbd5e1',
    placeholder: '#94a3b8',
  },
  
  // Dark Theme
  dark: {
    background: '#050407',
    surface: '#1e293b',
    card: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    border: '#475569',
    borderLight: '#334155',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: '#475569',
    placeholder: '#64748b',
  },
};

// Typography
export const Typography = {
  fontFamily: {
    regular: 'Poppins',
    medium: 'Poppins-Medium',
    bold: 'Poppins-bold',
    light: 'Poppins-light',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
    '4xl': 48,
    '5xl': 60,
    '6xl': 72,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Component Styles
export const Components = {
  button: {
    height: {
      sm: 32,
      md: 44,
      lg: 52,
    },
    padding: {
      sm: { paddingHorizontal: 12, paddingVertical: 6 },
      md: { paddingHorizontal: 16, paddingVertical: 12 },
      lg: { paddingHorizontal: 20, paddingVertical: 16 },
    },
  },
  
  input: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    padding: {
      horizontal: 12,
      vertical: 8,
    },
  },
  
  card: {
    padding: {
      sm: 12,
      md: 16,
      lg: 20,
    },
  },
};

// Banking specific theme
export const BankingTheme = {
  accountTypes: {
    checking: {
      color: Colors.primary[500],
      background: Colors.primary[50],
    },
    savings: {
      color: Colors.success[500],
      background: Colors.success[50],
    },
    credit: {
      color: Colors.warning[500],
      background: Colors.warning[50],
    },
    investment: {
      color: Colors.banking.darkGold,
      background: Colors.banking.gold + '20',
    },
  },
  
  transactionTypes: {
    income: {
      color: Colors.success[600],
      icon: 'arrow-down-circle',
    },
    expense: {
      color: Colors.error[600],
      icon: 'arrow-up-circle',
    },
    transfer: {
      color: Colors.primary[600],
      icon: 'arrow-right-circle',
    },
  },
  
  cardTypes: {
    visa: {
      gradient: ['#1A1F71', '#0F4C75'],
    },
    mastercard: {
      gradient: ['#EB001B', '#F79E1B'],
    },
    amex: {
      gradient: ['#006FCF', '#1E88E5'],
    },
    discover: {
      gradient: ['#FF6000', '#FFA500'],
    },
  },
};

// Theme configuration
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  components: Components,
  banking: BankingTheme,
};

// Export types for TypeScript
export type ThemeColors = typeof Colors;
export type ThemeTypography = typeof Typography;
export type ThemeSpacing = typeof Spacing;
export type ThemeBorderRadius = typeof BorderRadius;
export type ThemeShadows = typeof Shadows;
export type ThemeComponents = typeof Components;
export type BankingThemeType = typeof BankingTheme;

export default Theme;
