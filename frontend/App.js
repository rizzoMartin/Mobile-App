import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from './UserScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import { AuthProvider, useAuth } from './AuthContext';


const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const LoggedNav = () => {
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="LoginNav" options={{ headerShown: false }} component={LoginNav} />
    </Stack.Navigator>
  );
}

const AppContent = () => {
  const { user } = useAuth();

  return(
    <NavigationContainer>
      {user !== null ? <LoggedNav/> : <LoginNav/>}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;