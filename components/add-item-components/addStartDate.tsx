import textStyles from "@/styles/textStyles";
import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

function textInputBackgroundColor(isFocused: boolean) {
    return { backgroundColor: isFocused ? "#333333" : "#111111" }
}

export default function addNotesView() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={textStyles.addItemText}>
                {"Start date/time:"}
            </Text>
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