import { React, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Text, Pressable, TextInput, Keyboard } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';
import { useAuth } from '../context/AuthContext';

const LevelType1 = forwardRef(({ levelData, hintUsed, useHint, placeholder, setPlaceholder, answer, setAnswer }, ref) => {
  const [localAnswer, setLocalAnswer] = useState(answer);
  const [translatedWord, setTranslatedWord] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const getWord = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/translation/${levelData.word}/${user.language}`);
        setTranslatedWord(response.data.message);
      } catch (error){
        console.error(error);
        alert(error.response ? error.response.data.error : error);
      }
    };

    getWord();
  }, [levelData]);

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
            currentPlaceholder[i] = hint; // Reemplaza el guion bajo por la letra correspondiente
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

  return(
    <>
      <Text>{translatedWord}</Text>
      <Pressable style={hintUsed ? styles.buttonDisabled : styles.button} onPress={getHint}>
        <Text>Pista</Text>
      </Pressable>
      <TextInput 
        value={localAnswer}
        onChangeText={(handleTextChange)}
        placeholder={placeholder}
        style={styles.inputAnswer}
      />
    </>
  );
});

export default LevelType1