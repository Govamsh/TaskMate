import React from 'react';
import { Tabs } from 'expo-router';
import { Home, PlusCircle, Settings } from 'lucide-react-native';
import { COLORS } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { isDark } = useTheme();
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const activeColor = isDark ? COLORS.primary.dark : COLORS.primary.light;
  const inactiveColor = isDark ? '#8E8E93' : '#8E8E93';
  const borderTopColor = isDark ? COLORS.border.dark : COLORS.border.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderTopColor,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="add-task"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}