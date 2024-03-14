import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { styles } from '../styles/Styles';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Pressable style={styles.button } onPress={() => {
        logout();
      }}>
        <Text style={styles.text}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;