/**
 * Custom hook for accessing theme values with light/dark mode support
 */

import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  
  return {
    ...Theme,
    colorScheme,
    colors: {
      ...Theme.colors,
      current: Theme.colors[colorScheme],
    },
  };
}

export function useThemedStyles<T extends Record<string, any>>(
  stylesFn: (theme: ReturnType<typeof useTheme>) => T
): T {
  const theme = useTheme();
  return stylesFn(theme);
}

// Helper hooks for getting themed values
export function useThemedColor(
  lightColor: string,
  darkColor: string
): string {
  const colorScheme = useColorScheme() ?? 'light';
  return colorScheme === 'light' ? lightColor : darkColor;
}

export function useThemedStyle<T>(
  lightStyle: T,
  darkStyle: T
): T {
  const colorScheme = useColorScheme() ?? 'light';
  return colorScheme === 'light' ? lightStyle : darkStyle;
}
