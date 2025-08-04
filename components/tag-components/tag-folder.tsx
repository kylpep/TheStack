import { useCell } from "@/db/tinybase";
import textStyles from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type folderProps = {
    tagName: string
}

export default function TagFolder({tagName}: folderProps){
    const tagColor = useCell("tagStyle",tagName,"tagColor")??theme.defaultTagColor;

    return(
    <Pressable style={styles.container} onPress={() => {}}>
        <Text style={textStyles.fileFolderText}>
            {tagName??"TagNotFound"}
        </Text>
        <Ionicons name="chevron-forward" color="#eeeeee" size={15}/> 
    </Pressable>
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