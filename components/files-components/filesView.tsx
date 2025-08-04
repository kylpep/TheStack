import ItemBox from "@/components/item-components/itemBox";
import { useSliceRowIds } from "@/db/tinybase";
import { getFolderTitle } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import AddFolderButton from "./addFolder";

export default function FilesView() {
    const folderIdPath = useStorageScreenState(state => state.folderPath);
    const escapeTo = useStorageScreenState(state => state.escapeTo);
    const escapeToRoot = useStorageScreenState(state => state.escapeToRoot);
    const parentId = folderIdPath[folderIdPath.length - 1];
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");
    const folderNamePath = folderIdPath.map((folderId) => getFolderTitle(folderId));

    return (
        <View style={{
            justifyContent: "flex-start",
            alignItems: "stretch",
            flex: 1,
            flexDirection: 'column',
            padding: 10,
            backgroundColor: "#111111",
            rowGap: 10,
            
        }}>

            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap"
            }}>
                <Pressable onPress={escapeToRoot} key="root">
                    <Text style={basicTextStyles.header}>
                        {"Files"}
                    </Text>
                </Pressable>
                {parentId &&
                    <>
                        <Ionicons name="chevron-forward"
                            color={theme.primaryColor}
                            size={basicTextStyles.header.fontSize}
                        />
                        {folderNamePath.slice(0, folderNamePath.length - 1).map((folderName, index) =>
                        (<>
                            <Pressable onPress={() => escapeTo(index)} key={index}>
                                <Text style={basicTextStyles.header}>
                                    {folderName}
                                </Text>
                            </Pressable>
                            <Ionicons key={index + " "} name="chevron-forward"
                                color={theme.primaryColor}
                                size={basicTextStyles.header.fontSize}
                            />
                        </>)
                        )}
                        <Text style={basicTextStyles.header} key="end">
                            {folderNamePath[folderNamePath.length - 1]}
                        </Text>
                    </>}
            </View>
            <>
                {itemIds.map((itemId, index) => (
                    <ItemBox itemId={itemId} key={index + "item"} />
                ))}
            </>

            <AddFolderButton />
        </View>

    )
}