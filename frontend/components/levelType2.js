import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/Styles";

const LevelType2 = ({ levelData, hintUsed, useHint, options }) => {
  const [selectedHint, setSelectedHint] = useState(levelData.hints[0]);

  const getHint = () => {
    if(!hintUsed){
      console.log(levelData.hints);
      useHint();
    } else {
      alert("Solo se puede usar una pista por nivel")
    }
  }

  console.log("Selected hint:", selectedHint);
  console.log("Available words:", levelData.selectedWords);

  return(
    <>
      <Text>{levelData.sentence}</Text>
      <Pressable style={hintUsed ? styles.buttonDisabled : styles.button} onPress={getHint}>
        <Text>Pista</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        {options.map((word, index) => (
          <Pressable 
            key={index} 
            style={word === selectedHint && hintUsed ? styles.buttonGame2Disabled : styles.buttonGame2 } 
            onPress={() => alert(word)}
            disabled={word === selectedHint}>
            <Text>{word}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export default LevelType2;