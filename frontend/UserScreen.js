import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import { styles } from './Styles';

const UserScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}> Iniciar Sesión </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}> Registrarse </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

export default UserScreen;