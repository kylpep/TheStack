import ItemBox from "@/components/files-components/item-components/itemBox";
import { useRow, useRowIds } from "@/db/tinybase";
import textStyles from "@/styles/textStyles";
import { Text, View } from "react-native";
import FileFolder from "./fileFolder";
import FolderHeader from "./fileHeader";

export default function FilesView() {
    const itemIds = useRowIds("activeItems");
    const row = useRow("activeItems", "4");

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
            <FileFolder />
            <FolderHeader />
            <>
                {itemIds.map((itemId, index) => (
                    <ItemBox itemId={itemId} key={index} />
                ))}
            </>
            <Text style={textStyles.fileHeaderText}>
                {itemIds}
            </Text>
        </View>
    )
}