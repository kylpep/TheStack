
//The thinnest item in the vertical direction

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateText from "./listItem_DateText";
import NotesText from "./listItem_NotesText";
import TagText from "./listItem_TagText";
import TitleText from "./listItem_TitleText";

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

//Flexes out horizontally
export default function ThinItemView(props: any) {
    const [completionState, setCompletionState] = useState(false);

    function toggleCompletionState() {
        setCompletionState(!completionState);
    }

    function handleCheckboxColor() {
        return { backgroundColor: completionState ? params.checkedColor : params.uncheckedColor };
    }

    return (
        <View style={styles.container}>
            <TitleText/>
            <DateText/>
            <NotesText/>
            <TagText/>   
            
        </View>
    )
}

//<Pressable style={[styles.checkbox, handleCheckboxColor()]} onPress={toggleCompletionState}/>

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: params.paddingHorizontal,
        borderRadius: 9,
        backgroundColor: "#333333",
        paddingVertical: params.paddingVertical,
        flexWrap: 'wrap',
    },
    checkbox: {
        aspectRatio: 1,
        height: params.checkboxSize,
        borderRadius: (params.checkboxSize) / 2,
        marginLeft: 5,
        alignSelf: "flex-end",
    }
});