import { useAddItemStore } from "@/states-zustand/addItemStates";
import { styleConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function addNotesView() {
    const inputRef = useRef<TextInput>(null);
    const notes = useAddItemStore(state => state.notes);
    const setNotes = useAddItemStore((state) => state.setNotes);
    const setFocus = useAddItemStore(state => state.setFocus);
    const isFocused = useAddItemStore(state => state.focus === "notes"); // updated selector
    const textInputBackgroundColor = { backgroundColor: isFocused ? styleConsts.focusedColor : styleConsts.backgroundColor };

    if(!isFocused) inputRef.current?.blur();
    
    return (
        <View style={styles.container}>
            <Text style={textStyles.addItemText}>
                {"Notes:"}
            </Text>
            <TextInput
                ref={inputRef}
                value={notes}
                onChangeText={text => setNotes(text)}
                onFocus={() => setFocus("notes")}
                onBlur={() => setNotes(notes.trim())}
                onSubmitEditing={() => setFocus("none")}
                placeholder="None"
                placeholderTextColor={textStyles.addItemPlaceholderText.color}
                textAlign="left"
                multiline={true}
                submitBehavior="blurAndSubmit"
                style={[
                    styles.input,
                    textStyles.addItemText,
                    textInputBackgroundColor
                ]}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: styleConsts.gap,
    },
    input: {
        borderRadius: styleConsts.borderRadius,
        flexShrink: 1,
        justifyContent: "flex-start",
    }
});