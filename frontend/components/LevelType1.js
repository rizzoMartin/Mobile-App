import { React, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Text, Pressable, TextInput, View, Vibration } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';

const LevelType1 = forwardRef(({ levelData, hintUsed, useHint, placeholder, setPlaceholder, answer, setAnswer, markAsCorrect, currentLevelIndex, correctAnswers }, ref) => {
  const [localAnswer, setLocalAnswer] = useState(answer);
  const [translatedWord, setTranslatedWord] = useState('');
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);

  useEffect(()=> {
    if(!placeholder) setPlaceholder('_'.repeat(levelData.word.length));
  }, [levelData.word, placeholder, setPlaceholder]);

  useEffect(() => {
    setLocalAnswer(answer);  // Actualiza la respuesta local cuando el nivel cambia
  }, [answer]);

  useImperativeHandle(ref, () => ({
    getLatestAnswer: () => localAnswer
  }));

  const getHint = () => {
    if(!hintUsed){
      console.log(levelData.hints);
      const hints = levelData.hints; // Supongamos que esto es algo como ["r", "C"]
      let currentPlaceholder = placeholder.split(""); // Transforma el placeholder en un array para modificarlo

      hints.forEach(hint => {
        // Encuentra todas las posiciones de esta letra en la palabra
        for (let i = 0; i < levelData.word.length; i++) {
          if (levelData.word[i].toLowerCase() === hint.toLowerCase()) {
            currentPlaceholder[i] = hint.toLowerCase(); // Reemplaza el guion bajo por la letra correspondiente
          }
        }
      });
      setLocalAnswer('');
      setAnswer('');
      setPlaceholder(currentPlaceholder.join('')); // Actualiza el estado del placeholder
      useHint();
    } else {
      alert("Solo se puede usar una pista por nivel")
    }
  }

  const handleTextChange = (text) => {
    setLocalAnswer(text);
  };

  const checkAnswer = async () => {
    console.log(localAnswer);
    const response = await axios.get(`http://${ip}:3000/level/verify-answer?levelId=${levelData.id}&userAnswer=${localAnswer}`);
    console.log(response.data);
    if(response.data.solution !== 'respuesta incorrecta') {
      markAsCorrect(currentLevelIndex);
      setIncorrectAnswer(null);
    } else {
      Vibration.vibrate();
      setIncorrectAnswer(true);
      setTimeout(() => {
        setIncorrectAnswer(null); // Restablece después de un segundo
      }, 500);
    }
  }

  return(
    <>
      <Text style={styles.hint}>{levelData.translatedWord}</Text>
      <Pressable 
        style={hintUsed ? styles.buttonDisabled : styles.button}
        onPress={getHint}
        disabled={correctAnswers[currentLevelIndex]}
      >
        <Text>Pista</Text>
      </Pressable>
      <View style={styles.inputRow}>
        <TextInput 
          value={localAnswer}
          onChangeText={handleTextChange}
          style={styles.inputAnswer}
          editable={!correctAnswers[currentLevelIndex]}
          inputMode="text"
        />
        <Pressable 
          style={incorrectAnswer 
            ? [styles.buttonCheck, { backgroundColor: '#FF4D4D' }] 
            : !correctAnswers[currentLevelIndex] 
              ? styles.buttonCheck 
              : [styles.buttonCheck, { backgroundColor: '#6BFFB1' }]}
          onPress={checkAnswer}>
          <Text>✔️</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>{correctAnswers[currentLevelIndex] ? localAnswer : placeholder}</Text>
    </>
  );
});

export default LevelType1