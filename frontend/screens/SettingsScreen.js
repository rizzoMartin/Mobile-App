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

const SettingsScreen = () => {
  return (
    <View>
        <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;