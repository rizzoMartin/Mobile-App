import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import axios from 'axios';


const HomeScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Text> Home Screen </Text>
    </View>
  );
}

export default HomeScreen;