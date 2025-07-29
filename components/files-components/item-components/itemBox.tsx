import { itemTagRelationship, tbStore, useLocalRowIds, useRow } from "@/db/tinybase";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DateText from "./item-dateText";
import NotesText from "./item-notesText";
import TagText from "./item-tagText";
import TitleText from "./item-titleText";

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
    const [completionState, setCompletionState] = useState(false);

    if(!tbStore.hasRow("activeItems", itemId)){
        return null;
    }

    const itemStore = useRow("activeItems", itemId);

    const tags = useLocalRowIds("itemTags", itemId, itemTagRelationship);

    function toggleCompletionState() {
        setCompletionState(!completionState);
    }

    function handleCheckboxColor() {
        return { backgroundColor: completionState ? params.checkedColor : params.uncheckedColor };
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <TitleText title={itemStore.title} />
                <DateText startDate={itemStore.startTimeStamp}
                    includesStartTime={itemStore.includesStartTime}
                    endDate={itemStore.endTimeStamp}
                    includesEndTime={itemStore.includesEndTime} />
                <NotesText notes={itemStore.notes}/>
                <TagText tags={tags}/>
            </View>
            <Pressable style={[styles.checkbox, handleCheckboxColor()]} onPress={toggleCompletionState} />
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