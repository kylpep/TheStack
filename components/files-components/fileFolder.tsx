import { useCell } from "@/db/tinybase";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import textStyles from "@/styles/textStyles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type folderProps = {
    itemId: string
}

export default function FileFolder({itemId}: folderProps){
    const folderName = useCell("activeItems",itemId,"title");
    const enterFolder = useStorageScreenState(state => state.traverseIntoFolder);

    return(
    <Pressable style={styles.container} onPress={() => enterFolder(itemId)}>
        <Text style={textStyles.fileFolderText}>
            {folderName??"Invalid Folder"}
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