import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskFilter } from '../types';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming, FadeIn } from 'react-native-reanimated';

interface FilterTabsProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  const { isDark } = useTheme();
  
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const activeBackgroundColor = isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? 'rgba(60, 60, 67, 0.1)' : 'rgba(60, 60, 67, 0.05)', 
        { duration: 300 }
      ),
    };
  });

  const getTabStyle = (filter: TaskFilter) => {
    const isActive = currentFilter === filter;
    
    return {
      backgroundColor: isActive ? 
        (isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light) : 
        'transparent',
      borderRadius: 8,
      padding: SPACING.sm,
      paddingHorizontal: SPACING.md,
      marginRight: SPACING.xs,
    };
  };
  
  const getTextStyle = (filter: TaskFilter) => {
    const isActive = currentFilter === filter;
    
    return {
      color: isActive ? 
        (isDark ? COLORS.primary.dark : COLORS.primary.light) : 
        (isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light),
      fontSize: FONT_SIZE.sm,
      fontWeight: isActive ? '600' : '400',
    };
  };

  return (
    <Animated.View 
      style={[styles.container, containerStyle]}
      entering={FadeIn.duration(300)}
    >
      <TouchableOpacity
        style={getTabStyle('all')}
        onPress={() => onFilterChange('all')}
        activeOpacity={0.7}
      >
        <Text style={getTextStyle('all')}>All</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={getTabStyle('pending')}
        onPress={() => onFilterChange('pending')}
        activeOpacity={0.7}
      >
        <Text style={getTextStyle('pending')}>Pending</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={getTabStyle('completed')}
        onPress={() => onFilterChange('completed')}
        activeOpacity={0.7}
      >
        <Text style={getTextStyle('completed')}>Completed</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: SPACING.md,
    padding: 4,
  },
});

export default FilterTabs;