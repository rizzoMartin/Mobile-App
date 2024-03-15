import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, FlatList, View } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';
import LoadingScreen from './LoadingScreen';

const LevelSelectionScreen = ({ navigation, route }) => {
  const { topicId, languageId } = route.params;
  const [levels, setLevel] = useState([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loadLevels = async () => {
      try{
        const response = await axios.get(`http://${ip}:3000/level/${topicId}/${languageId}`);
        console.log(response.data);
        setLevel(response.data);
      } catch (error) {
        console.log(error);
        alert(error.response ? error.response.data.error : error);
      }
    }

    loadLevels();
  }, [topicId, languageId]);

  const goNextLevel = () => {
    if(currentLevelIndex < levels.length - 1){
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
    else {
      setIsFinished(true);
    }
  };

  if(isFinished) {
    return(
      <View style={styles.container}>
        <Text>Fin del nivel</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text>Volver a Home</Text>
        </Pressable>
      </View>
    );
  }

  if(levels.length) {
    return(
      <SafeAreaView style={styles.container}>
        <Text>Bienvenido a {topicId} {languageId}</Text>
        <Text>{levels[currentLevelIndex].word}</Text>
        <Pressable style={styles.button} onPress={goNextLevel}>
          <Text>Siguiente</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  else {
    return(
      <LoadingScreen />
    );
  }
}

export default LevelSelectionScreen;