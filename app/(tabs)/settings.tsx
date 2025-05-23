import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { 
  Moon, 
  LogOut, 
  User, 
  ChevronRight, 
  Bell,
  HelpCircle,
  ShieldCheck,
  Info
} from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  FadeIn
} from 'react-native-reanimated';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const backgroundColor = isDark ? COLORS.background.dark : COLORS.background.light;
  const cardBackgroundColor = isDark ? COLORS.cardBackground.dark : COLORS.cardBackground.light;
  const textColor = isDark ? COLORS.text.primary.dark : COLORS.text.primary.light;
  const secondaryTextColor = isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light;
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
  
  const secondaryTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(secondaryTextColor, { duration: 300 }),
    };
  });

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to log out?')) {
        logout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: () => logout() },
        ]
      );
    }
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Header title="Settings" />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {user ? (
          <Animated.View 
            style={[styles.userCard, cardStyle]}
            entering={FadeIn.duration(300)}
          >
            <View style={styles.userAvatar}>
              <User size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </View>
            <View style={styles.userInfo}>
              <Animated.Text style={[styles.userName, textStyle]}>
                {user.email?.split('@')[0]}
              </Animated.Text>
              <Animated.Text style={[styles.userEmail, secondaryTextStyle]}>
                {user.email}
              </Animated.Text>
            </View>
          </Animated.View>
        ) : (
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: COLORS.primary.light }
            ]}
            onPress={() => router.push('/auth')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>
        )}
        
        <Animated.Text 
          style={[styles.sectionTitle, textStyle]}
          entering={FadeIn.duration(300).delay(100)}
        >
          Appearance
        </Animated.Text>
        
        <Animated.View 
          style={[styles.settingCard, cardStyle]}
          entering={FadeIn.duration(300).delay(150)}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Moon 
                size={20} 
                color={isDark ? COLORS.accent.dark : COLORS.accent.light} 
              />
            </View>
            <Animated.Text style={[styles.settingText, textStyle]}>
              Dark Mode
            </Animated.Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ 
                false: '#767577', 
                true: COLORS.primary.light 
              }}
              thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </Animated.View>
        
        <Animated.Text 
          style={[styles.sectionTitle, textStyle]}
          entering={FadeIn.duration(300).delay(200)}
        >
          Notifications
        </Animated.Text>
        
        <Animated.View 
          style={[styles.settingCard, cardStyle]}
          entering={FadeIn.duration(300).delay(250)}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Bell 
                size={20} 
                color={isDark ? COLORS.secondary.dark : COLORS.secondary.light} 
              />
            </View>
            <Animated.Text style={[styles.settingText, textStyle]}>
              Task Reminders
            </Animated.Text>
            <Switch
              value={false}
              trackColor={{ 
                false: '#767577', 
                true: COLORS.primary.light 
              }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </Animated.View>
        
        <Animated.Text 
          style={[styles.sectionTitle, textStyle]}
          entering={FadeIn.duration(300).delay(300)}
        >
          Support
        </Animated.Text>
        
        <Animated.View 
          style={[styles.settingCard, cardStyle]}
          entering={FadeIn.duration(300).delay(350)}
        >
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <HelpCircle 
                size={20} 
                color={isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light} 
              />
            </View>
            <Animated.Text style={[styles.settingText, textStyle]}>
              Help Center
            </Animated.Text>
            <ChevronRight size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <ShieldCheck 
                size={20} 
                color={isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light} 
              />
            </View>
            <Animated.Text style={[styles.settingText, textStyle]}>
              Privacy Policy
            </Animated.Text>
            <ChevronRight size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Info 
                size={20} 
                color={isDark ? COLORS.text.secondary.dark : COLORS.text.secondary.light} 
              />
            </View>
            <Animated.Text style={[styles.settingText, textStyle]}>
              About TaskMate
            </Animated.Text>
            <ChevronRight size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
          </TouchableOpacity>
        </Animated.View>
        
        {user && (
          <Animated.View 
            entering={FadeIn.duration(300).delay(400)}
          >
            <TouchableOpacity
              style={[
                styles.logoutButton,
                { borderColor: COLORS.error.light }
              ]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={20} color={COLORS.error.light} />
              <Text style={[styles.logoutText, { color: COLORS.error.light }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        
        <View style={styles.footer}>
          <Animated.Text style={[styles.footerText, secondaryTextStyle]}>
            TaskMate v1.0.0
          </Animated.Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  userCard: {
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FONT_SIZE.sm,
  },
  loginButton: {
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  settingCard: {
    borderRadius: 12,
    marginBottom: SPACING.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.lg,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
  },
});