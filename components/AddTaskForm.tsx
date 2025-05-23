import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Calendar, X, Plus } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

interface AddTaskFormProps {
  onAddTask: (title: string, dueDate: Date | null) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, onCancel }) => {
  const { isDark } = useTheme();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [error, setError] = useState('');
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  const placeholderColor = isDark ? COLORS.text.tertiary.dark : COLORS.text.tertiary.light;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
    };
  });
  
  const inputStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light, 
        { duration: 300 }
      ),
      borderColor: withTiming(
        isDark ? COLORS.border.dark : COLORS.border.light, 
        { duration: 300 }
      ),
      color: withTiming(textColor, { duration: 300 }),
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(textColor, { duration: 300 }),
    };
  });

  const handleAddTask = () => {
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    onAddTask(title, dueDate);
    setTitle('');
    setDueDate(null);
    setError('');
    Keyboard.dismiss();
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value ? new Date(event.target.value) : null;
    setDueDate(selectedDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View 
          style={[styles.container, containerStyle]}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <X size={24} color={isDark ? COLORS.text.primary.dark : COLORS.text.primary.light} />
            </TouchableOpacity>
            <Animated.Text style={[styles.headerTitle, textStyle]}>Add New Task</Animated.Text>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={styles.formContainer}>
            <Animated.Text style={[styles.label, textStyle]}>Task Title</Animated.Text>
            <Animated.View style={[styles.inputContainer, inputStyle]}>
              <TextInput
                style={styles.input}
                placeholder="Enter task title..."
                placeholderTextColor={placeholderColor}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (error) setError('');
                }}
                autoFocus
              />
            </Animated.View>
            
            {error ? (
              <Animated.Text style={[styles.errorText, { color: COLORS.error.light }]}>
                {error}
              </Animated.Text>
            ) : null}
            
            <Animated.Text style={[styles.label, textStyle, { marginTop: SPACING.md }]}>
              Due Date (Optional)
            </Animated.Text>
            
            {Platform.OS === 'web' ? (
              <Animated.View style={[styles.inputContainer, inputStyle]}>
                <input
                  type="date"
                  onChange={handleDateChange}
                  value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: textColor,
                    padding: SPACING.md,
                    width: '100%',
                    height: 50,
                    fontSize: FONT_SIZE.md,
                  }}
                />
              </Animated.View>
            ) : (
              <TouchableOpacity 
                style={[
                  styles.datePickerButton,
                  {
                    backgroundColor: isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light,
                    borderColor: isDark ? COLORS.border.dark : COLORS.border.light,
                  }
                ]}
              >
                <Calendar 
                  size={20} 
                  color={dueDate ? (isDark ? COLORS.primary.dark : COLORS.primary.light) : placeholderColor} 
                />
                <Text 
                  style={[
                    styles.dateText, 
                    { 
                      color: dueDate ? textColor : placeholderColor,
                      marginLeft: SPACING.sm
                    }
                  ]}
                >
                  {dueDate ? dueDate.toDateString() : 'Select due date (optional)'}
                </Text>
                
                {dueDate && (
                  <TouchableOpacity 
                    onPress={() => setDueDate(null)} 
                    style={styles.clearDateButton}
                  >
                    <X size={16} color={placeholderColor} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.addButton, 
                { 
                  backgroundColor: COLORS.primary.light,
                  opacity: !title.trim() ? 0.7 : 1,
                }
              ]}
              onPress={handleAddTask}
              disabled={!title.trim()}
              activeOpacity={0.8}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    height: 50,
  },
  errorText: {
    fontSize: FONT_SIZE.sm,
    marginTop: 4,
    marginLeft: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  dateText: {
    fontSize: FONT_SIZE.md,
  },
  clearDateButton: {
    marginLeft: 'auto',
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.xl,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});

export default AddTaskForm;