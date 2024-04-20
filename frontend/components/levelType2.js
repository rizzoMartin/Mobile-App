import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Vibration } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from "../context/ip";

const LevelType2 = ({ levelData, hintUsed, useHint, options, markAsCorrect, currentLevelIndex, correctAnswers }) => {
  const [selectedHint, setSelectedHint] = useState(levelData.hints[0]);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);

  const getHint = () => {
    if(!hintUsed){
      console.log(levelData.hints);
      useHint();
    } else {
      alert("Solo se puede usar una pista por nivel")
    }
  }
  console.log("options: ", options);
  console.log("Selected hint: ", selectedHint);
  console.log("Available words: ", levelData.selectedWords);

  const checkAnswer = async (word) => {
    const response = await axios.get(`http://${ip}:3000/level/verify-answer?levelId=${levelData.id}&userAnswer=${word}`);
    console.log(response.data);
    if(response.data.solution !== 'respuesta incorrecta') {
      markAsCorrect(currentLevelIndex);
      setIncorrectAnswer(null);
    } else {
      Vibration.vibrate();
      setIncorrectAnswer(word);
      setTimeout(() => {
        setIncorrectAnswer(null); // Restablece después de un segundo
      }, 500);
    }
  }

  const getButtonStyle = (word) => {
    if (word === selectedHint && hintUsed) {
      return styles.buttonGame2Disabled;
    } else if (incorrectAnswer === word) {
      return [styles.buttonGame2, { backgroundColor: '#FF4D4D' }];  // Fondo rojo para respuestas incorrectas
    } else if (correctAnswers[currentLevelIndex] && word === levelData.solution) {
      return [styles.buttonGame2, { backgroundColor: '#6BFFB1' }];  // Fondo verde para respuestas correctas
    } else {
      return styles.buttonGame2;
    }
  }

  return(
    <>
      <Text>{levelData.sentence}</Text>
      <Pressable 
        style={hintUsed ? styles.buttonDisabled : styles.button}
        onPress={getHint}
        disabled={correctAnswers[currentLevelIndex]}
      >
        <Text>Pista</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        {options.map((word, index) => (
          <Pressable 
            key={index} 
            style={getButtonStyle(word)} 
            onPress={() => checkAnswer(word)}
            disabled={word === selectedHint && hintUsed || correctAnswers[currentLevelIndex]}>
            <Text>{word}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export default LevelType2;