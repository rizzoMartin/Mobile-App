import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable, FlatList, ImageBackground, View } from 'react-native';
import { styles } from '../styles/Styles';
import axios from 'axios';
import ip from '../context/ip';

const HomeScreen = ({ navigation }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/language`);
        console.log(response.data);
        setLanguages(response.data);
      } catch (error) {
        console.log(error);
        alert(error.response ? error.response.data.error : error);
      }
    }

    loadLanguages();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F1FF' }}>
      <FlatList
        contentContainerStyle={{ padding: 5, paddingBottom: 20, marginVertical:20 }}
        data={languages} // Asegúrate de que 'languages' está disponible en este scope
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
            <Pressable style={styles.gridItem}
            onPress={() => {
              navigation.navigate("LevelSelection", {languageName: item.name, languageId: item.id});
            }}
            >
              <ImageBackground source={{ uri: `http://${ip}:3000/${item.imageUrl}` }}
                style={{width:'100%', height:'100%'}}
                resizeMode='cover'
                imageStyle={{ borderRadius: styles.gridItem.borderRadius }}
              />
            </Pressable>
            <Text style={{textAlign: 'center'}}> {item.displayName} </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;