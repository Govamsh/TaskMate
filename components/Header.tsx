import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface HeaderProps {
  title: string;
  rightAction?: () => void;
  rightIcon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightAction, rightIcon }) => {
  const { isDark, toggleTheme } = useTheme();
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? COLORS.background.dark : COLORS.background.light,
        { duration: 300 }
      ),
      borderBottomColor: withTiming(
        isDark ? COLORS.border.dark : COLORS.border.light,
        { duration: 300 }
      ),
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        isDark ? COLORS.text.primary.dark : COLORS.text.primary.light,
        { duration: 300 }
      ),
    };
  });

  return (
    <Animated.View style={[styles.header, containerStyle]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          {isDark ? (
            <Sun size={22} color={COLORS.accent.dark} />
          ) : (
            <Moon size={22} color={COLORS.accent.light} />
          )}
        </TouchableOpacity>
      </View>
      
      <Animated.Text style={[styles.title, textStyle]}>
        {title}
      </Animated.Text>
      
      <View style={styles.rightContainer}>
        {rightAction && rightIcon && (
          <TouchableOpacity onPress={rightAction}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  themeToggle: {
    padding: 4,
  },
});

export default Header;