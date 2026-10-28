import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/navigation/types';
import { MainTabs } from './src/navigation/MainTabs';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ChatScreen } from './src/screens/ChatScreen';

import { useAuth } from './src/hooks/useAuth';
import { colors, radius, typography } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={splashStyles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={splashStyles.logoCircle}>
          <Text style={splashStyles.logoEmoji}>💬</Text>
        </View>
        <Text style={splashStyles.appName}>ChatRealtime</Text>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={splashStyles.spinner}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? 'Main' : 'Login'}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 44,
  },
  appName: {
    ...typography.title,
    color: colors.primary,
  },
  spinner: {
    marginTop: 24,
  },
});

export default App;
