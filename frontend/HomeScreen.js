import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = ({ navigation }) => {
  
  const logOut = () => {
    AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    navigation.navigate('LoginNav');
  }

  return(
    <View style={styles.container}>
      <Text> Home Screen </Text>
      <Button title='Log Out' onPress={() => {
        logOut();
      }} />
    </View>
  );
}

export default HomeScreen;