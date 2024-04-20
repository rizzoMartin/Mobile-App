import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { styles } from '../styles/Styles';
import { useAuth } from '../context/AuthContext';
import ip from '../context/ip';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [userPoints, setUserPoints] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadUserPoints = async () => {
        try {
          const response = await axios.get(`http://${ip}:3000/user/points?user_id=${user.id}`);
          setUserPoints(response.data); // Almacenar la respuesta en el estado
        } catch (error) {
          console.error(error);
        }
      };

      loadUserPoints(); // Cargar datos cuando se accede al componente
    }, [user.id]) // Dependencia para recargar si cambia user.id
  );

  const renderItem = ({ item }) => (
    <View>
      <Text style={{fontSize: 16}}>
        Idioma: {item.language_name}, 
        Tema: {item.topic_name}, 
        Puntos: {item.points}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {paddingBottom:20}]}>{user.username}</Text>

      <View style={{ flex: 1, maxHeight: '70%' }}>
        <FlatList
          data={userPoints}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};


export default ProfileScreen;