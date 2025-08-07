import AddFolderInput from "@/components/files-components/addFolder";
import FileRouteHeader from "@/components/files-components/fileRouteHeader";
import FilesView from "@/components/files-components/filesView";
import { getFolderTitle } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { View } from "react-native";

export default function filesScreen(){
    const folderIdPath = useStorageScreenState(state => state.folderPath);
    const parentId = useStorageScreenState(state => state.currentFolder);
    const folderNamePath = folderIdPath.map((folderId) => getFolderTitle(folderId));

    return (
        <View style={{
            justifyContent: "flex-start",
            alignItems: "stretch",
            flex: 1,
            flexDirection: 'column',
            rowGap: 10,
        }}>
            <FileRouteHeader folderNamePath={folderNamePath} parentId={parentId} key={"header"}/>
            <AddFolderInput key={"input"}/>
            <FilesView parentId={parentId} key={"body"}/>
            
            
        </View>

    )
}