import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "../styles/Styles";

const LevelType1 = ({ levelData, levels, currentLevelIndex }) => {
  const getHint = () => {
    console.log(levelData.hints);
  }

  return(
    <>
      <Text>{levelData.word}</Text>
      <Pressable style={styles.button} onPress={getHint}>
        <Text>Pista</Text>
      </Pressable>
    </>
  );
}

export default LevelType1