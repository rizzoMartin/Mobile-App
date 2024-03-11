import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendToBack = async () => {
    const userData = {
      email,
      password
    };

    try{
      // para que vaya debo tener el movil conectado a la misma wifi que el pc y cambiar la ip siempre que cambie de wifi o pc
      // (no va con eduroam)
      const response = await axios.post('http://192.168.2.217:3000/user/login', userData);
      console.log(response.data.email);
      alert('Usuario autenticado correctamente');
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      return true;
    } catch (error) {
      console.log(error);
      alert(error.response ? error.response.data.message : error);
      return false;
    }
  }

  return(
    <View style={styles.container}>
      <TextInput placeholder="email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="contraseña" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={async () => {
          const autenticado = await sendToBack()
          if(autenticado){
            navigation.navigate('Home')
          }
      }}>
        <Text style={styles.text}> Iniciar sesión </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;