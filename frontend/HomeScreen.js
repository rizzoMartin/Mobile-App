import React, { useState } from 'react';
import { View, Text, Button, Pressable  } from 'react-native';
import { styles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = ({ navigation }) => {
  
  const logOut = () => {
    AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    navigation.navigate('LoginNav');
  }

  return(
    <View style={styles.container}>
      <Text> Home Screen </Text>
      <Pressable style={ styles.button } onPress={() => {
        logOut();
      }}>
        <Text> Log Out </Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;