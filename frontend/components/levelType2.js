import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/Styles";

const LevelType2 = ({ levelData }) => {
  const getHint = () => {
    console.log(levelData.hints);
  }

  // Esta función mezcla el arreglo de manera aleatoria
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // intercambio de elementos
    }
    return array;
  };

  // Combina la palabra del nivel con las pistas y luego mezcla el arreglo
  const words = shuffleArray([levelData.word, ...levelData.hints]);

  return(
    <>
      <Text>{levelData.sentence}</Text>
      <Pressable style={styles.button} onPress={getHint}>
        <Text>Pista</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        {words.map((word, index) => (
          <Pressable key={index} style={[styles.buttonGame, {marginVertical: 100}]} onPress={() => alert(word)}>
            <Text>{word}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export default LevelType2;