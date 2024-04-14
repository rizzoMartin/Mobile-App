import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, FlatList, View } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';


const LevelSelectionScreen = ({ navigation, route }) => {
  const { languageName, languageId } = route.params;
  const [topics, setTopics] = useState();

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/topic`);
        console.log(response.data);
        setTopics(response.data);
      } catch (error) {
        console.log(error);
        alert(error.response ? error.response.data.error : error);
      }
    }

  loadTopics();
  }, []);

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F1FF' }}>
      <FlatList
        contentContainerStyle={{ padding: 5, paddingBottom: 20, marginVertical:20 }}
        data={topics}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
            <Pressable style={ [styles.gridItem, {backgroundColor:'#F8F1FF'}] }
            onPress={() => {
              navigation.navigate("Level", {topicId: item.id, languageId: languageId});
            }}
            >
              <Text style={styles.text}>{item.topic}</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default LevelSelectionScreen;