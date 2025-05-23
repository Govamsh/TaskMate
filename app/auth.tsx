import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  FadeIn
} from 'react-native-reanimated';

export default function AuthScreen() {
  const { isDark } = useTheme();
  const { signIn, signUp, error } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [validationError, setValidationError] = useState('');
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const cardBackgroundColor = isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light;
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  const placeholderColor = isDark ? COLORS.text.tertiary.dark : COLORS.text.tertiary.light;
  const borderColor = isDark ? COLORS.border.dark : COLORS.border.light;
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
    };
  });
  
  const cardStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(cardBackgroundColor, { duration: 300 }),
      borderColor: withTiming(borderColor, { duration: 300 }),
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(textColor, { duration: 300 }),
    };
  });
  
  const inputStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        { duration: 300 }
      ),
      borderColor: withTiming(borderColor, { duration: 300 }),
      color: withTiming(textColor, { duration: 300 }),
    };
  });

  const validate = () => {
    setValidationError('');
    
    if (!email.trim()) {
      setValidationError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setValidationError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      if (!error) {
        router.replace('/');
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.container, containerStyle]}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X size={24} color={isDark ? COLORS.text.primary.dark : COLORS.text.primary.light} />
          </TouchableOpacity>
          
          <Animated.View 
            style={[styles.authCard, cardStyle]}
            entering={FadeIn.duration(300)}
          >
            <Animated.Text style={[styles.title, textStyle]}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Animated.Text>
            
            <View style={styles.form}>
              <Animated.Text style={[styles.label, textStyle]}>
                Email
              </Animated.Text>
              <Animated.View style={[styles.inputContainer, inputStyle]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={placeholderColor}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Animated.View>
              
              <Animated.Text style={[styles.label, textStyle, { marginTop: SPACING.md }]}>
                Password
              </Animated.Text>
              <Animated.View style={[styles.inputContainer, inputStyle]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </Animated.View>
              
              {(validationError || error) && (
                <Text style={styles.errorText}>
                  {validationError || error}
                </Text>
              )}
              
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: COLORS.primary.light }
                ]}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setIsLogin(!isLogin)}
                style={styles.switchAuthMode}
              >
                <Animated.Text style={[styles.switchAuthText, textStyle]}>
                  {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    padding: SPACING.xs,
    zIndex: 10,
  },
  authCard: {
    borderRadius: 16,
    padding: SPACING.lg,
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
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    marginBottom: SPACING.xs,
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
    color: COLORS.error.light,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.sm,
    marginLeft: 4,
  },
  submitButton: {
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  switchAuthMode: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  switchAuthText: {
    fontSize: FONT_SIZE.sm,
  },
});