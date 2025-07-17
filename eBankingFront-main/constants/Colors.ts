/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  // Banking App Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#007AFF', // Main brand blue
    600: '#0056cc',
    700: '#0041a3',
    800: '#003175',
    900: '#002657',
  },
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
  warning: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
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
  // Neutral Colors for UI Elements
  neutral: {
    0: '#ffffff',
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
    950: '#0a0a0a',
  },
  // Banking Specific Colors
  banking: {
    // Card Types
    visa: '#1434cb',
    mastercard: '#eb001b',
    amex: '#006fcf',
    discover: '#ff6000',
    
    // Account Types
    checking: '#007AFF',
    savings: '#34c759',
    credit: '#ff3b30',
    investment: '#af52de',
    
    // Transaction Types
    income: '#34c759',
    expense: '#ff3b30',
    transfer: '#007AFF',
    pending: '#ff9500',
  },
  // Glassmorphism & Overlay Colors
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    heavy: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.1)',
    darkMedium: 'rgba(0, 0, 0, 0.2)',
    darkHeavy: 'rgba(0, 0, 0, 0.3)',
  },
  // Gradient Colors
  gradients: {
    primary: ['#007AFF', '#0056cc'],
    secondary: ['#64748b', '#475569'],
    success: ['#22c55e', '#16a34a'],
    sunset: ['#ff7b7b', '#ff9a56'],
    ocean: ['#4facfe', '#00f2fe'],
    purple: ['#a855f7', '#8b5cf6'],
    emerald: ['#34d399', '#10b981'],
  },
  // Shadow Colors
  shadows: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    heavy: 'rgba(0, 0, 0, 0.25)',
    colored: 'rgba(0, 122, 255, 0.3)', // Primary color shadow
  },
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Handle rgba colors
  if (color.startsWith('rgba')) {
    return color.replace(/[\d\.]+\)$/g, `${opacity})`);
  }
  
  // Handle rgb colors
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  }
  
  return color;
};

// Theme-specific color palettes
export const lightTheme = {
  ...Colors.light,
  primary: Colors.primary[500],
  secondary: Colors.secondary[500],
  success: Colors.success[500],
  warning: Colors.warning[500],
  error: Colors.error[500],
  surface: Colors.neutral[0],
  surfaceVariant: Colors.neutral[50],
  outline: Colors.neutral[200],
  shadow: Colors.shadows.light,
};

export const darkTheme = {
  ...Colors.dark,
  primary: Colors.primary[400],
  secondary: Colors.secondary[400],
  success: Colors.success[400],
  warning: Colors.warning[400],
  error: Colors.error[400],
  surface: Colors.neutral[900],
  surfaceVariant: Colors.neutral[800],
  outline: Colors.neutral[700],
  shadow: Colors.shadows.heavy,
};

export default Colors;
