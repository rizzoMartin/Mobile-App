import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, Pressable, View } from "react-native";
import { styles } from "../styles/Styles";
import axios from "axios";
import ip from '../context/ip';
import LoadingScreen from './LoadingScreen';
import LevelType1 from "../components/LevelType1";
import LevelType2 from "../components/levelType2";
import LevelType3 from "../components/levelType3";

const LevelScreen = ({ navigation, route }) => {
  const { topicId, languageId } = route.params;
  const [levels, setLevels] = useState([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usedHints, setUsedHints] = useState(new Set());
  const [placeholders, setPlaceholders] = useState({});
  const [answers, setAnswers] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState({});
  const currentLevelRef = useRef(null);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    const loadLevels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://${ip}:3000/level/levels?topicId=${topicId}&languageId=${languageId}`);
        console.log(response.data);
        const data = response.data.map(level => addHints(level, response.data));
        
        const mixedWords = {};
        data.forEach((level, index) => {
          if (level.type === 2) {
            mixedWords[index] = shuffleArray([level.word, ...level.selectedWords]);
          }
        });
        
        setLevels(data);
        setShuffledOptions(mixedWords);
        initializeState(data);
      } catch (error) {
        console.error(error);
        alert(error.response ? error.response.data.error : error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevels();
  }, [topicId, languageId]); // Dependencias del efecto

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const addHints = (level, allLevels) => {
    // Para niveles de tipo 2, seleccionar dos palabras aleatorias de otros niveles
    if (level.type === 2) {
      const otherWords = allLevels
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
        const hintIndex = Math.floor(Math.random() * selectedWords.length);
        const hints = [selectedWords[hintIndex]];  // 'hints' ahora es un array con una sola palabra

        return { ...level, selectedWords: selectedWords, hints: hints };
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
  };
  
  const initializeState = (levels) => {
    const newPlaceholders = {};
    const newAnswers = {};
    const newCorrectAnswers = {};
    levels.forEach((level, index) => {
        newPlaceholders[index] = '_'.repeat(level.word.length);
        newAnswers[index] = '';
        newCorrectAnswers[index] = false;  // Inicializa todos los niveles como incorrectos
    });
    setPlaceholders(newPlaceholders);
    setAnswers(newAnswers);
    setCorrectAnswers(newCorrectAnswers);  // Guarda el estado inicializado
};

  const handleUseHint = () => {
    setUsedHints(prevHints => {
      const newHints = new Set(prevHints);
      newHints.add(currentLevelIndex);
      return newHints;
    });
  };

  const updateAnswerBeforeLeaving = () => {
    if(currentLevelRef.current) {
      const updatedAnswer = currentLevelRef.current.getLatestAnswer();
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentLevelIndex]: updatedAnswer
      }));
    }
  };

  const goNextLevel = () => {
    updateAnswerBeforeLeaving();
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const goPreviousLevel = () => {
    updateAnswerBeforeLeaving();
    if (isFinished) {
      setIsFinished(false);
    }
    else if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  }

  const markAsCorrect = (index) => {
    updateAnswerBeforeLeaving();
    setCorrectAnswers(prev => ({ ...prev, [index]: true }));
  };

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

  const countCorrectAnswers = () => {
    return Object.keys(correctAnswers).filter(key => correctAnswers[key] === true).length;
  };
  

  if (isFinished) {
    return (
      <View style={styles.container}>
        <Text>Fin del nivel</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text>Volver a Home</Text>
        </Pressable>
        <Text>
          {countCorrectAnswers()} / {levels.length}
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonGame} onPress={goPreviousLevel}>
            <Text>Atrás</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const LevelComponent = () => {
    const currentLevelData = levels[currentLevelIndex];
    const hintUsed = usedHints.has(currentLevelIndex);
    const currentPlaceholder = placeholders[currentLevelIndex] || '';
    const currentAnswer = answers[currentLevelIndex] || '';
    switch(currentLevelData.type) {
      case 1:
        return <LevelType1 
          levelData={currentLevelData}
          hintUsed={hintUsed}
          useHint={handleUseHint}
          placeholder={currentPlaceholder}
          setPlaceholder={(newPlaceholder) => {
            setPlaceholders({...placeholders, [currentLevelIndex]: newPlaceholder});
          }}
          answer={currentAnswer}
          setAnswer={(newAnswer) => {
            setAnswers({...answers, [currentLevelIndex]: newAnswer});
          }}
          markAsCorrect={markAsCorrect}
          currentLevelIndex={currentLevelIndex}
          correctAnswers={correctAnswers}
          ref={currentLevelRef}
        />;
      case 2:
        return <LevelType2
          levelData={currentLevelData}
          hintUsed={hintUsed}
          useHint={handleUseHint}
          options={shuffledOptions[currentLevelIndex]}
          markAsCorrect={markAsCorrect}
          currentLevelIndex={currentLevelIndex}
          correctAnswers={correctAnswers}
        />;
      case 3:
        return <LevelType3 
          levelData={currentLevelData}
          hintUsed={hintUsed}
          useHint={handleUseHint}
          placeholder={currentPlaceholder}
          setPlaceholder={(newPlaceholder) => {
            setPlaceholders({...placeholders, [currentLevelIndex]: newPlaceholder});
          }}
          answer={currentAnswer}
          setAnswer={(newAnswer) => {
            setAnswers({...answers, [currentLevelIndex]: newAnswer});
          }}
          markAsCorrect={markAsCorrect}
          currentLevelIndex={currentLevelIndex}
          correctAnswers={correctAnswers}
          ref={currentLevelRef}
        />;
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
        <Pressable style={[styles.buttonGame, 
          currentLevelIndex < 1 && { flex: 2 },
          !correctAnswers[currentLevelIndex] && !usedHints.has(currentLevelIndex) ? styles.buttonGameDisabled : styles.buttonGame
        ]} 
          onPress={goNextLevel}
          disabled={!correctAnswers[currentLevelIndex] && !usedHints.has(currentLevelIndex)}
        >
          <Text>Siguiente</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LevelScreen;
