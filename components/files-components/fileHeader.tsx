import textStyles from "@/styles/textStyles";
import { StyleSheet, Text, View } from "react-native";


export default function folderHeader(){
    return(
    <View style={styles.container}>
        <Text style={textStyles.fileHeaderText}>
            {"Test!"}
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