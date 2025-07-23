import textStyles from "@/styles/textStyles";
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

function textInputBackgroundColor(isFocused: boolean) {
    return { backgroundColor: isFocused ? "#333333" : "#111111" }
}

export default function addTagsView() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={textStyles.addItemText}>
                {"Tags:"}
            </Text>
            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                allowFontScaling={false}
                placeholder="None"
                placeholderTextColor={textStyles.addItemPlaceholderText.color}
                textAlign="right"
                multiline={true}
                submitBehavior="blurAndSubmit"
                style={[
                    styles.input,
                    textStyles.addItemText,
                    textInputBackgroundColor(isFocused)
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
        columnGap: 10,
    },
    input: {
        borderRadius: 5,
        flexShrink: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 5,
        paddingVertical: 2,
    }
});