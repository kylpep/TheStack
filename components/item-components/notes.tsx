import { useCell } from "@/db/tinybase";
import { setActiveItemNotes } from "@/db/tinybaseActions";
import { styleConsts } from "@/styles/styleConsts";
import { basicTextStyles } from "@/styles/textStyles";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//TODO: Rename component
//Make so tapping outside of the keyboard does something, either dismiss or access other item or both

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
            submitBehavior="blurAndSubmit"

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
        flexShrink: 1,
        padding: 0,
    }
});