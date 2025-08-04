import { useSliceRowIds } from "@/db/tinybase";
import { getActiveItemFromTagId } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { basicTextStyles } from "@/styles/textStyles";
import { Pressable, Text } from "react-native";
import ItemBox from "../item-components/itemBox";

type tagSelectedListProps={
    currentTag: string
}

export default function TagSelectedList({currentTag}: tagSelectedListProps) {
    const resetTag = useStorageScreenState(state => state.resetCurrentTag);
    const tagIds = useSliceRowIds("tagItemIndex", currentTag);

    const itemIds = tagIds.map((tagId) => getActiveItemFromTagId(tagId));

    return (
        <>
            <Pressable onPress={resetTag} key="root">
                <Text style={basicTextStyles.header}>
                    {currentTag}
                </Text>
            </Pressable>
            {itemIds.map((itemId, index) => (
                itemId &&
                <ItemBox itemId={itemId} key={index}/>
            ))}
        </>
    )

}