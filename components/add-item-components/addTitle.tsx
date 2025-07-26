import { useAddItemStore } from "@/states-zustand/addItemStates";
import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function addTitleView() {
    const inputRef = useRef<TextInput>(null);
    const title = useAddItemStore(store => store.title);
    const setTitle = useAddItemStore(store => store.setTitle);
    const setFocus = useAddItemStore(store => store.setFocus);
    const isFocused = useAddItemStore(state => state.focus === "title"); // updated selector
    const textInputBackgroundColor = { backgroundColor: isFocused ? itemConsts.focusedColor : itemConsts.backgroundColor };

    if (!isFocused) inputRef.current?.blur();

    return (
        <View style={styles.container}>
            <Text style={textStyles.addItemText} numberOfLines={1}>
                {"Title:"}
            </Text>
            <TextInput
                ref={inputRef}
                value={title}
                onChangeText={text => setTitle(text)}
                onFocus={() => setFocus("title")}
                onSubmitEditing={() => setFocus("none")}
                placeholder="Enter here"
                placeholderTextColor={textStyles.addItemPlaceholderText.color}
                textAlign="left"
                multiline={true}
                scrollEnabled={false}
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
        columnGap: itemConsts.gap,
    },
    input: {
        borderRadius: itemConsts.borderRadius,
        justifyContent: "center",
        flexShrink: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
    }
});