import { StyleSheet } from 'react-native';

export const COLORS = {
  // Primary colors
  primary: {
    light: '#0A84FF',
    dark: '#0A84FF',
  },
  
  // Secondary colors
  secondary: {
    light: '#5E5CE6',
    dark: '#5E5CE6',
  },
  
  // Accent colors
  accent: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  
  // Success colors
  success: {
    light: '#30D158',
    dark: '#30D158',
  },
  
  // Warning colors
  warning: {
    light: '#FFD60A',
    dark: '#FFD60A',
  },
  
  // Error colors
  error: {
    light: '#FF453A',
    dark: '#FF453A',
  },
  
  // Background colors
  background: {
    light: '#FFFFFF',
    dark: '#1C1C1E',
  },
  
  // Card background colors
  cardBackground: {
    light: '#F2F2F7',
    dark: '#2C2C2E',
  },
  
  // Text colors
  text: {
    primary: {
      light: '#000000',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#3C3C43',
      dark: '#EBEBF5',
    },
    tertiary: {
      light: '#8E8E93',
      dark: '#8E8E93',
    },
  },
  
  // Border colors
  border: {
    light: '#D1D1D6',
    dark: '#38383A',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  bold: '700',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mb: {
    marginBottom: SPACING.md,
  },
  mt: {
    marginTop: SPACING.md,
  },
  mr: {
    marginRight: SPACING.md,
  },
  ml: {
    marginLeft: SPACING.md,
  },
  card: {
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
  },
  button: {
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
});