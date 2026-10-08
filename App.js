import React, { useState, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { isDarkMode, colors } = useContext(ThemeContext);
  
  // Temporary local profile info
  const [user, setUser] = useState({
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300',
    bio: 'Software Developer learning React Native.',
  });

  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;
  
  // Create a custom theme to pass to NavigationContainer to match our colors
  const customNavTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={customNavTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        
        <Stack.Screen name="Profile" options={{ title: 'My Profile' }}>
          {(props) => <ProfileScreen {...props} user={user} />}
        </Stack.Screen>
        
        <Stack.Screen name="EditProfile" options={{ title: 'Edit Profile' }}>
          {(props) => <EditProfileScreen {...props} user={user} setUser={setUser} />}
        </Stack.Screen>
        
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </NavigationContainer>
  );
};

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
