import React from 'react';
import { SafeAreaView, Text, Pressable, FlatList } from 'react-native';
import { styles } from '../styles/Styles';
import { useAuth } from '../context/AuthContext';

const Languages = [
  {
    id: "1",
    name: "español"
  },
  {
    id: "2",
    name: "inglés"
  },
  {
    id: "3",
    name: "francés"
  },
  {
    id: "4",
    name: "italiano"
  },
  {
    id: "5",
    name: "alemán"
  },
  {
    id: "6",
    name: "portugués"
  },
  {
    id: "7",
    name: "chino"
  },
  {
    id: "8",
    name: "japonés"
  },
  {
    id: "9",
    name: "ruso"
  },
  {
    id: "10",
    name: "ucraniano"
  }
]

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F1FF' }}>
      <FlatList
        contentContainerStyle={{ padding: 5, paddingBottom: 20, marginVertical:20 }}
        data={Languages} // Asegúrate de que 'languages' está disponible en este scope
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.gridItem} onLongPress={() => {
            alert('hola ' + item.name);
          }}>
            <Text style={styles.gridItemText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;