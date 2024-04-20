import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './UserScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { styles } from '../styles/Styles';

const SettingsScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.email}</Text>
      <Pressable style={styles.button} onPress={() => logout()}>
        <Text style={styles.text}>Desconectarse</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;