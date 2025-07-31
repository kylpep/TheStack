import textStyles from "@/styles/textStyles";
import { StyleSheet, Text, View } from "react-native";

type folderProps = {
    text?: string
}

export default function folderHeader({text}: folderProps){
    return(
    <View style={styles.container}>
        <Text style={textStyles.fileHeaderText}>
            {text??"Test!"}
        </Text>
    </View>
    )
}

//for other, just have no text.

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        
        borderColor: "white",
        borderBottomWidth: 1,
    }
});