import React from 'react';
import { SafeAreaView, Text, Pressable, FlatList, ImageBackground, View } from 'react-native';
import { styles } from '../styles/Styles';

import spanishIcon from '../assets/flags/espana.png';
import englishIcon from '../assets/flags/reino-unido.png';
import frenchIcon from '../assets/flags/francia.png';
import italianIcon from '../assets/flags/italia.png';
import germanIcon from '../assets/flags/alemania.png';
import portugueseIcon from '../assets/flags/portugal.png';
import chineseIcon from '../assets/flags/china.png';
import japaneseIcon from '../assets/flags/japon.png';
import russianIcon from '../assets/flags/rusia.png';
import ucranianIcon from '../assets/flags/ucrania.png';

const languageIcons = {
  spanish: spanishIcon,
  english: englishIcon,
  french: frenchIcon,
  italian: italianIcon,
  german: germanIcon,
  portuguese: portugueseIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  russian: russianIcon,
  ucranian: ucranianIcon,
};

const Languages = [
  {
    id: "1",
    name: "spanish",
    nombre: "Español"
  },
  {
    id: "2",
    name: "english",
    nombre: "Inglés"
  },
  {
    id: "3",
    name: "french",
    nombre: "Francés"
  },
  {
    id: "4",
    name: "italian",
    nombre: "Italiano"
  },
  {
    id: "5",
    name: "german",
    nombre: "Alemán"
  },
  {
    id: "6",
    name: "portuguese",
    nombre: "Portugués"
  },
  {
    id: "7",
    name: "chinese",
    nombre: "Chino"
  },
  {
    id: "8",
    name: "japanese",
    nombre: "Japonés"
  },
  {
    id: "9",
    name: "russian",
    nombre: "Ruso"
  },
  {
    id: "10",
    name: "ucranian",
    nombre: "Ucraniano"
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
          <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
            <Pressable style={styles.gridItem}
            onPress={() => {
              alert('hola ' + item.nombre);
            }}
            >
              <ImageBackground source={languageIcons[item.name]}
                style={{width:'100%', height:'100%'}}
                resizeMode='cover'
                imageStyle={{ borderRadius: styles.gridItem.borderRadius }}
              />
            </Pressable>
            <Text style={{textAlign: 'center'}}> {item.nombre} </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;