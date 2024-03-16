import React from "react";
import { Text, Pressable, Image } from "react-native";
import { styles } from "../styles/Styles";
import ip from "../context/ip";

const LevelType3 = ({ levelData }) => {
  return(
    <>
      <Image 
        source={{ uri: `http://${ip}:3000/${levelData.imageUrl}` }}
        style={{ width: 200, height: 200 }}
      />
    </>
  );
}

export default LevelType3