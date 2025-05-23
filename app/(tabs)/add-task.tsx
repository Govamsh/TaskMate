import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TasksContext';
import { useAuth } from '@/context/AuthContext';
import AddTaskForm from '@/components/AddTaskForm';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AddTaskScreen() {
  const { isDark } = useTheme();
  const { addNewTask, loading } = useTasks();
  const { user } = useAuth();
  const router = useRouter();
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
      flex: 1,
    };
  });

  const handleAddTask = async (title: string, dueDate: Date | null) => {
    if (!user) return;
    
    await addNewTask(title, dueDate);
    router.replace('/');
  };

  const handleCancel = () => {
    router.replace('/');
  };

  if (!user) {
    return (
      <Animated.View style={containerStyle}>
        <Header title="Add Task" />
        <EmptyState message="Please sign in to add tasks." />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={containerStyle}>
      <AddTaskForm 
        onAddTask={handleAddTask} 
        onCancel={handleCancel} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});