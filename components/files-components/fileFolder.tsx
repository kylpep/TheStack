import textStyles from "@/styles/textStyles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type folderProps = {
    text?: string
}

export default function FileFolder({text}: folderProps){
    return(
    <View style={styles.container}>
        <Text style={textStyles.fileFolderText}>
            {text??"noTag"}
        </Text>
        <Ionicons name="chevron-forward" color="#eeeeee" size={15}/> 
    </View>
    )
}

//for other, just have no text.

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 3,
        
        borderColor: "#333333",
        borderWidth: 2,
        borderRadius: 9,
    }
});