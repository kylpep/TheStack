import { itemTagRelationship, tbStore, useCell, useLocalRowIds, useRow } from "@/db/tinybase";
import { Pressable, StyleSheet, View } from "react-native";

const params = {
    paddingHorizontal: 10,
    paddingVertical: 6,
    textSize: 16,
    checkboxSize: 22,
    uncheckedColor: "#dcdcdcff",
    checkedColor: "#98f49bff",
    textColor: "#ffffff",
    itemTitleText: "This is a sentence",
    elementBorder: 0,
}

type itemBoxProps = {
    itemId: string;
}

//Flexes out horizontally
export default function ItemBox({ itemId }: itemBoxProps) {
    const itemStore = useRow("activeItems", itemId);
    const tagRowIds = useLocalRowIds("itemTags", itemId, itemTagRelationship);
    const tags = tagRowIds.map((rowId) => (useCell("tagAssignment",rowId,"tag")))

    if(!tbStore.hasRow("activeItems", itemId)){
        return null;
    }

    

    function handleCheckboxColor() {
        return { backgroundColor: params.checkedColor};
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>

            </View>
            <Pressable style={[styles.checkbox, handleCheckboxColor()]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: params.paddingHorizontal,
        paddingVertical: params.paddingVertical,
        borderRadius: 9,
        backgroundColor: "#333333",
        columnGap: 10,
    },
    textContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: 'wrap',
        flexShrink: 1,
        columnGap: 5,
        flex: 1,
    },
    checkbox: {
        aspectRatio: 1,
        height: params.checkboxSize,
        borderRadius: (params.checkboxSize) / 2,
    }
});