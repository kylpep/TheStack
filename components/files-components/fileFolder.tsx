import { useCell } from "@/db/tinybase";
import { useAddItemStore } from "@/states-zustand/addItemStates";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { folderStyle } from "@/styles/folderStyle";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type folderProps = {
    itemId: string
}

export default function FileFolder({ itemId }: folderProps) {
    const folderName = useCell("activeItems", itemId, "title");
    const enterFolder = useStorageScreenState(state => state.traverseIntoFolder);
    const setParentId = useAddItemStore(state => state.setParentId);
    const parentId = useAddItemStore(state => state.parentId);
    const onPress = () => {
        setParentId(itemId);
        enterFolder(itemId);
    }

    return (
        <Pressable style={folderStyle.container} onPress={onPress}>
            <Text style={folderStyle.text}>
                {folderName ?? "Invalid Folder"}
            </Text>
            <Ionicons name="chevron-forward" color={theme.primaryColor} size={15} />
        </Pressable>
    )
}
