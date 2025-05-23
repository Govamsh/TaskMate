import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No tasks found. Add a new task to get started!' 
}) => {
  const { isDark } = useTheme();
  
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? COLORS.background.dark : COLORS.background.light, 
        { duration: 300 }
      ),
    };
  });
  
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light, 
        { duration: 300 }
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <ClipboardList 
        size={60} 
        color={isDark ? '#8E8E93' : '#8E8E93'} 
        strokeWidth={1.5}
      />
      <Animated.Text style={[styles.message, animatedTextStyle]}>
        {message}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  message: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginTop: SPACING.md,
    maxWidth: 250,
    lineHeight: 24,
  },
});

export default EmptyState;