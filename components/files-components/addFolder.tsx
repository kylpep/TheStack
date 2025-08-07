import { addFolderToActive } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { folderStyle } from "@/styles/folderStyle";
import CustomTextInput from "../customTextInput";

export default function AddFolderInput() {
    const addFolder = useStorageScreenState(state => state.addFolder);
    const setAddFolder = useStorageScreenState(state => state.setAddFolder);
    const parentId = useStorageScreenState(state => state.currentFolder);

    return (
        addFolder &&
        <CustomTextInput
            defaultText = {""}
            placeholderText="Add New Folder"
            setStorageValue = {(text) => addFolderToActive(text, parentId)}
            onSubmit={() => setAddFolder(false)}
            autofocus = {true}
            style = {[folderStyle.container,folderStyle.text]}
            />    
    )
}
