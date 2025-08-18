import ItemBox from "@/components/item-components/fileItemBox";
import { useSliceRowIds } from "@/db/tinybase";
import { setFileOrder } from "@/db/tinybaseActions";
import { View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Pressable } from "react-native-gesture-handler";

type FilesProps = {
    parentId: string | undefined
}

type renderItemParams = {
    item: string,
    drag: () => void,
    isActive: boolean,
}

export default function FilesView({ parentId }: FilesProps) {
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");

    const renderItem = ({ item, drag, isActive }: renderItemParams) => {
        return (
            <ScaleDecorator>
                <Pressable
                    onLongPress={drag}
                    disabled={isActive}
                >
                    <ItemBox itemId={item}/>

                </Pressable>
            </ScaleDecorator>
        )
    }

    

    return (
        <View
            style={{
                flex: 1,
                alignItems: "stretch",
            }}>
            <DraggableFlatList
                data={itemIds}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                onDragEnd={({data})=>{setFileOrder(data)}}
            />
        </View>
    )
}