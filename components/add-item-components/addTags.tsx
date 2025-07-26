import Tag from "@/components/add-item-components/tag";
import { useAddItemStore } from "@/states";
import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";


export default function addTagsView() {
    const inputRef = useRef<TextInput>(null);
    const currentTag = useAddItemStore(state => state.currentTag);
    const tags = useAddItemStore(state => state.tags);
    const setCurrentTag = useAddItemStore(state => state.setCurrentTag);
    const startNewTag = useAddItemStore(state => state.startNewTag);
    const removeTag = useAddItemStore(state => state.removeTag);
    const editTag = useAddItemStore(state => state.editTag);
    const setFocus  = useAddItemStore(state => state.setFocus);
    const isFocused = useAddItemStore((state) => state.focus) === "tags";
    const textInputBackgroundColor = { backgroundColor: isFocused ? itemConsts.focusedColor : itemConsts.backgroundColor };

    if (!isFocused) inputRef.current?.blur()
    else inputRef.current?.focus()

    return (
        <View style={styles.container}>
            <Text style={textStyles.addItemText}>
                {"Tags:"}
            </Text>
            {
                tags.map((tagName, index) => (
                    <Tag name={tagName}
                        key={index}
                        deletable={true}
                        editable={true}
                        onDelete={() => removeTag(index)}
                        onEdit={() => {
                            editTag(index);
                            setFocus("tags");
                            inputRef.current?.focus();
                        }} />
                ))
            }
            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    value={currentTag}
                    onChangeText={text => setCurrentTag(text)}
                    onSubmitEditing={() => {startNewTag(); if(currentTag==="") setFocus("none")}}
                    onFocus={() => setFocus("tags")}
                    onBlur={startNewTag}
                    placeholder="New tag"
                    placeholderTextColor={textStyles.addItemPlaceholderText.color}
                    textAlign="left"
                    multiline={true}
                    submitBehavior="submit"
                    style={[
                        styles.input,
                        textStyles.addItemText,
                        textInputBackgroundColor
                    ]}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap"
    },
    inputContainer: {
        flexDirection: "row",
        flexGrow: 1,
        flexWrap: "wrap",
        justifyContent: "flex-end",
        gap: 5,
    },
    input: {
        borderRadius: 5,
        flexShrink: 1,
        justifyContent: "flex-start",
        alignSelf: "flex-end"
    }
});