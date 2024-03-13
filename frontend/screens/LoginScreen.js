import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/Styles';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const sendToBack = async () => {
    const userData = {
      email,
      password
    };

    try{
      // para que vaya debo tener el movil conectado a la misma wifi que el pc y cambiar la ip siempre que cambie de wifi o pc
      // (no va con eduroam)
      const response = await axios.post('http://192.168.2.211:3000/user/login', userData);
      console.log(response.data.email);
      login(response.data.email);
    } catch (error) {
      console.log(error);
      alert(error.response ? error.response.data.message : error);
    }
  }

  return(
    <View style={styles.container}>
      <TextInput placeholder="email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="contraseña" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.button} onPress={ async () => await sendToBack() }>
        <Text style={styles.text}> Iniciar sesión </Text>
      </Pressable>
    </View>
  );
}

export default LoginScreen;