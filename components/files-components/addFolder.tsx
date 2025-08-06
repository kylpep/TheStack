import { addFolderToActive } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { styleConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function AddFolderInput() {
    const [text, setText] = useState("");
    const addFolder = useStorageScreenState(state => state.addFolder);
    const setAddFolder = useStorageScreenState(state => state.setAddFolder);
    const parentId = useStorageScreenState(state => state.currentFolder);

    function submitFolder(){
        const folderName = text.trim()
        if(folderName){
            addFolderToActive(folderName, parentId);
            setText("");
        }
        setAddFolder(false);
    }

    return (
        addFolder &&
        <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={submitFolder}
            autoFocus={true}
            placeholder="Add new folder"
            style={[
                styles.input,
                textStyles.fileHeaderText,
            ]}
        />

        
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: styleConsts.borderRadius,
        justifyContent: "center",
        flexShrink: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,

        borderColor: "#333333",
        borderWidth: 2,
    }
});