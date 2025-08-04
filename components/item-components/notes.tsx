import { useCell } from "@/db/tinybase";
import { setActiveItemNotes } from "@/db/tinybaseActions";
import { styleConsts } from "@/styles/styleConsts";
import { basicTextStyles } from "@/styles/textStyles";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

type notesProps = {
    itemId: string;
}

export default function ListItemNotesText({ itemId }: notesProps) {
    const notes = useCell("activeItems", itemId, "notes")??"";

    const setNotes = (newNotes: string) => setActiveItemNotes(itemId, newNotes);

    const [text, setText] = useState(notes);

    useEffect(()=>{
        setText(notes);
    }, [notes])

    return (
        notes &&
        <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => setNotes(text.trim())}

            multiline={true}
            scrollEnabled={false}

            style={[
                styles.input,
                basicTextStyles.body,
            ]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: styleConsts.borderRadius,
        justifyContent: "center",
        flexShrink: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
    }
});