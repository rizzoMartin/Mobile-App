import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/Styles";


const LevelSelectionScreen = ({ navigation, route }) => {
    const { languageName } = route.params;
    return(
        <View style={styles.container}>
            <Text>Holaa {languageName}</Text>
        </View>
    );
}

export default LevelSelectionScreen;