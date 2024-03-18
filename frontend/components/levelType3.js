import React from "react";
import { Text, Pressable, Image } from "react-native";
import { styles } from "../styles/Styles";
import ip from "../context/ip";

const LevelType3 = ({ levelData, levels, currentLevelIndex }) => {
  const getHint = () => {
    console.log(levelData.hints);
  }

  return(
    <>
      <Image 
        source={{ uri: `http://${ip}:3000/${levelData.imageUrl}` }}
        style={{ width: 200, height: 200 }}
      />
      <Pressable style={styles.button} onPress={getHint}>
        <Text>Pista</Text>
      </Pressable>
    </>
  );
}

export default LevelType3