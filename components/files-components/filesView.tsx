import ItemBox from "@/components/files-components/item-components/itemBox";
import { useCell, useSliceRowIds } from "@/db/tinybase";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import textStyles from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function FilesView() {
    const folderIdPath = useStorageScreenState(state => state.folderPath);
    const parentId = folderIdPath[-1];
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");
    const folderNamePath = folderIdPath.map((folderId) => useCell("activeItems", folderId, "title"));

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "stretch",
            flex: 1,
            flexDirection: 'column',
            padding: 10,
            backgroundColor: "#111111",
            rowGap: 10,
        }}>
            {parentId &&
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {folderNamePath.slice(0, -1).map((folderName, index) =>
                    (<>
                        <Pressable key={index}>
                            <Text style={textStyles.fileHeaderText}>
                                {folderName}
                            </Text>
                        </Pressable>
                        <Ionicons name="chevron-forward" color={theme.primaryTextColor} size={textStyles.fileHeaderText.fontSize} />
                    </>)
                    )}
                    <Text style={textStyles.fileHeaderText}>
                        {folderNamePath[-1]}
                    </Text>
                </View>
            }

            <>
                {itemIds.map((itemId, index) => (
                    <ItemBox itemId={itemId} key={index} />
                ))}
            </>
        </View>
    )
}