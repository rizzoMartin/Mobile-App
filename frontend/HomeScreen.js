import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './Styles';
import { useAuth } from './AuthContext';

const HomeScreen = ({ navigation }) => {

  const { user, logout} = useAuth();

  return(
    <View style={styles.container}>
      <Text> {user !== null ? user : 'error'} </Text>
      <Pressable style={ styles.button } onPress={() => {
        logout();
        navigation.navigate('LoginNav');
      }}>
        <Text> Log Out </Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;