import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { CheckSquare, Square, Trash2, Calendar } from 'lucide-react-native';
import { Task } from '../types';
import { format } from 'date-fns';
import { COLORS, SPACING, FONT_SIZE, commonStyles } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus, onDelete }) => {
  const { isDark } = useTheme();
  
  const backgroundColor = isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light;
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  const secondaryTextColor = isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light;
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
      borderColor: withTiming(isDark ? COLORS.border.dark : COLORS.border.light, { duration: 300 }),
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(textColor, { duration: 300 }),
      textDecorationLine: task.completed ? 'line-through' : 'none',
      opacity: task.completed ? 0.7 : 1,
    };
  });

  const secondaryTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(secondaryTextColor, { duration: 300 }),
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardContent}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => onToggleStatus(task.id, !task.completed)}
          activeOpacity={0.7}
        >
          {task.completed ? (
            <CheckSquare 
              size={24} 
              color={COLORS.success.light} 
              strokeWidth={1.5}
            />
          ) : (
            <Square 
              size={24} 
              color={isDark ? COLORS.text.primary.dark : COLORS.text.primary.light} 
              strokeWidth={1.5}
            />
          )}
        </TouchableOpacity>
        
        <View style={styles.taskDetails}>
          <Animated.Text style={[styles.taskTitle, textStyle]}>
            {task.title}
          </Animated.Text>
          
          {task.dueDate && (
            <View style={styles.dueDate}>
              <Calendar size={14} color={isDark ? '#8E8E93' : '#8E8E93'} />
              <Animated.Text style={[styles.dueDateText, secondaryTextStyle]}>
                {format(task.dueDate, 'MMM d, yyyy')}
              </Animated.Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          onPress={() => onDelete(task.id)}
          style={styles.deleteButton}
          activeOpacity={0.7}
        >
          <Trash2 
            size={20} 
            color={COLORS.error.light}
            strokeWidth={1.5}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: SPACING.md,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: FONT_SIZE.md,
    marginBottom: 2,
  },
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dueDateText: {
    fontSize: FONT_SIZE.xs,
    marginLeft: 4,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
});

export default TaskCard;