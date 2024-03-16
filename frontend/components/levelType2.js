import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "../styles/Styles";

const LevelType2 = ({ levelData }) => {
  return(
    <>
      <Text>{levelData.sentence}</Text>
    </>
  );
}

export default LevelType2