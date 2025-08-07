import ItemBox from "@/components/item-components/itemBox";
import { useSliceRowIds } from "@/db/tinybase";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import DraggableItem from "../draggable";


type FilesProps = {
    parentId: string | undefined
}

export default function FilesView({ parentId }: FilesProps) {
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");

    return (
        <View
            style={{
                flex: 1,
                alignItems: "stretch",
            }}>
            <FlashList

                data={itemIds}
                renderItem={({ item, index }) => (
                    <DraggableItem index={index} >
                        <ItemBox itemId={item} />
                    </DraggableItem>
                )}
                estimatedItemSize={68}
            />
        </View>
    )
}