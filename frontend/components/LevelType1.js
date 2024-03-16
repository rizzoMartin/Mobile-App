import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "../styles/Styles";

const LevelType1 = ({ levelData }) => {
  return(
    <>
      <Text>{levelData.word}</Text>
    </>
  );
}

export default LevelType1