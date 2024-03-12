import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './Styles';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');

  const sendToBack = async () => {
    if (password !== confirmedPassword) {
      alert('Las contraseñas deben coincidir');
      return;
    }

    const userData = {
      username,
      email,
      password,
      language: selectedLanguage
    };

    try{
      // para que vaya debo tener el movil conectado a la misma wifi que el pc y cambiar la ip siempre que cambie de wifi o pc
      // (no va con eduroam)
      const response = await axios.post('http://192.168.22.239:3000/user/registry', userData);
      console.log(response.data.email);
      alert('Usuario añadido correctamente');
      navigation.navigate('User');
    } catch (error) {
      console.log(error);
      alert(error.response ? error.response.data.message : error);
    }
  }

  return(
    <View style={styles.container}>
      <TextInput placeholder="username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="contraseña" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="confirmar contraseña" style={styles.input} secureTextEntry value={confirmedPassword} onChangeText={setConfirmedPassword} />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={setSelectedLanguage}
          style={styles.picker}
        >
          <Picker.Item label="🇪🇸 Español" value="spanish" />
          <Picker.Item label="🇬🇧 Inglés" value="english" />
        </Picker>
      </View>
      <Pressable style={styles.button} onPress={() => sendToBack()}>
        <Text style={styles.text}> Registrarse </Text>
      </Pressable>
    </View>
  );
}

export default RegisterScreen;
