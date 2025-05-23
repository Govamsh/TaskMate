import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  RefreshControl, 
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/constants/theme';
import { useTasks } from '@/context/TasksContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import TaskCard from '@/components/TaskCard';
import EmptyState from '@/components/EmptyState';
import FilterTabs from '@/components/FilterTabs';
import Header from '@/components/Header';
import { Task } from '@/types';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  FadeIn,
  SlideInLeft
} from 'react-native-reanimated';
import { LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { 
    filteredTasks, 
    loading, 
    error, 
    filter, 
    setFilter, 
    refreshTasks, 
    toggleTaskStatus, 
    removeTask 
  } = useTasks();
  
  const { isDark } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  
  const [refreshing, setRefreshing] = useState(false);
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
    };
  });
  
  const titleStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(textColor, { duration: 300 }),
    };
  });

  const onRefresh = useCallback(async () => {
    if (!user) return;
    
    setRefreshing(true);
    await refreshTasks();
    setRefreshing(false);
  }, [refreshTasks, user]);

  const handleToggleStatus = (id: string, completed: boolean) => {
    toggleTaskStatus(id, completed);
  };

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to delete this task?')) {
        removeTask(id);
      }
    } else {
      Alert.alert(
        'Delete Task',
        'Are you sure you want to delete this task?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => removeTask(id) },
        ]
      );
    }
  };
  
  const renderItem = ({ item, index }: { item: Task, index: number }) => (
    <Animated.View
      entering={SlideInLeft.delay(index * 50).springify()}
    >
      <TaskCard
        task={item}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </Animated.View>
  );

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Header title="TaskMate" />
        <EmptyState message="Please sign in to view and manage your tasks." />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Header title="TaskMate" />
      
      <View style={styles.content}>
        <Animated.Text 
          style={[styles.welcomeText, titleStyle]}
          entering={FadeIn.duration(300).delay(100)}
        >
          {getGreeting()}, {user.email?.split('@')[0]}
        </Animated.Text>
        
        <FilterTabs 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
        
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary.light} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : filteredTasks.length === 0 ? (
          <EmptyState 
            message={
              filter === 'all' 
                ? 'No tasks found. Add your first task to get started!'
                : filter === 'completed' 
                  ? 'No completed tasks. Complete a task to see it here.'
                  : 'No pending tasks. All your tasks are completed!'
            } 
          />
        ) : (
          <FlatList
            data={filteredTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary.light]}
                tintColor={isDark ? '#FFFFFF' : COLORS.primary.light}
              />
            }
          />
        )}
      </View>
    </Animated.View>
  );
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  welcomeText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    marginBottom: SPACING.md,
    fontFamily: 'Roboto-Bold',
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    color: COLORS.error.light,
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
  },
});