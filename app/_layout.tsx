import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { TasksProvider } from '@/context/TasksContext';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Platform } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
  });

  useFrameworkReady();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{ 
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'default' : 'fade',
              }}
            />
            <Stack.Screen
              name="auth"
              options={{ 
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'default' : 'fade',
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{ 
                title: 'Not Found',
                animation: Platform.OS === 'ios' ? 'default' : 'fade',
              }}
            />
          </Stack>
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}