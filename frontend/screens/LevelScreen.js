import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, Pressable, View } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';
import LoadingScreen from './LoadingScreen';
import LevelType1 from "../components/LevelType1";
import LevelType2 from "../components/levelType2";
import LevelType3 from "../components/levelType3";

const LevelSelectionScreen = ({ navigation, route }) => {
  const { topicId, languageId } = route.params;
  const [levels, setLevels] = useState([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLevels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://${ip}:3000/level/${topicId}/${languageId}`);
        console.log(response.data);
        setLevels(response.data);
      } catch (error) {
        console.error(error);
        alert(error.response ? error.response.data.error : error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevels();
  }, [topicId, languageId]); // Dependencias del efecto

  const currentLevelData = levels[currentLevelIndex];

  useEffect(() => {
    // Solo ejecutar esta lógica una vez que los niveles están cargados y no están vacíos
    if (!isLoading && levels.length > 0) {
      const updatedLevels = levels.map(level => {
        // Para niveles de tipo 2, seleccionar dos palabras aleatorias de otros niveles
        if (level.type === 2) {
          const otherWords = levels
            .filter(otherLevel => otherLevel.word !== level.word)
            .map(otherLevel => otherLevel.word);
  
          if (otherWords.length >= 2) {
            const selectedWords = [];
            while (selectedWords.length < 2) {
              const randomIndex = Math.floor(Math.random() * otherWords.length);
              const randomWord = otherWords[randomIndex];
              if (!selectedWords.includes(randomWord)) {
                selectedWords.push(randomWord);
              }
            }
            return { ...level, hints: selectedWords };
          }
        }
        // Para niveles de tipo 1 y 3, asignar dos letras aleatorias de la palabra del nivel
        else if (level.type === 1 || level.type === 3) {
          const word = level.word;
          const length = word.length;
          
          const index1 = Math.floor(Math.random() * length);
          let index2 = Math.floor(Math.random() * length);
      
          while (index2 === index1) {
            index2 = Math.floor(Math.random() * length);
          }
      
          const letter1 = word[index1];
          const letter2 = word[index2];
          
          return { ...level, hints: [letter1, letter2] };
        }
        // Para los niveles que no requieren modificación, retornarlos sin cambios
        return level;
      });
  
      // Actualizar el estado de levels con esta nueva información
      setLevels(updatedLevels);
    }
  }, [isLoading]); // Dependencias del useEffect
  

  const goNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const goPreviousLevel = () => {
    if (isFinished) {
      setIsFinished(false);
    }
    else if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Si no está cargando y levels está vacío, podrías manejarlo aquí
  if (levels.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay niveles disponibles para este tema.</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text>Volver</Text>
        </Pressable>
      </View>
    );
  }

  if (isFinished) {
    return (
      <View style={styles.container}>
        <Text>Fin del nivel</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text>Volver a Home</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonGame} onPress={goPreviousLevel}>
            <Text>Atrás</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const LevelComponent = () => {
    switch(currentLevelData.type) {
      case 1:
        return <LevelType1 levelData={currentLevelData} levels={levels} currentLevelIndex={currentLevelIndex} />;
      case 2:
        return <LevelType2 levelData={currentLevelData} levels={levels} currentLevelIndex={currentLevelIndex} />;
      case 3:
        return <LevelType3 levelData={currentLevelData} levels={levels} currentLevelIndex={currentLevelIndex} />;
    }
  };

  return (
    <View style={styles.container}>
      <LevelComponent />
      <View style={styles.buttonContainer}>
        {currentLevelIndex >= 1 && (
          <Pressable style={styles.buttonGame} onPress={goPreviousLevel}>
            <Text>Atrás</Text>
          </Pressable>
        )}
        <Pressable style={[styles.buttonGame, currentLevelIndex < 1 && { flex: 2 }]} onPress={goNextLevel}>
          <Text>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LevelSelectionScreen;
