import { TextStyle } from 'react-native';

// Base font configuration
export const FONT_FAMILY = 'Poppins';

// Helper function to create text styles with Poppins font
export const createTextStyle = (style: TextStyle): TextStyle => ({
  ...style,
  fontFamily: FONT_FAMILY,
});

// Common text styles using Poppins
export const textStyles = {
  // Headers
  header: createTextStyle({
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  }),
  
  subheader: createTextStyle({
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  }),
  
  // Body text
  body: createTextStyle({
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  }),
  
  bodySmall: createTextStyle({
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  }),
  
  // Labels
  label: createTextStyle({
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  }),
  
  // Info text
  info: createTextStyle({
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  
  // Button text
  button: createTextStyle({
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  }),
  
  // Amount display
  amount: createTextStyle({
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  }),
  
  // Secondary amount
  amountSecondary: createTextStyle({
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
  }),
};
