import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
    onPress: () => void;
    text: string;
}

type ButtonTwoLineProps ={
    onPress: () => void;
    text1: string;
    text2: string;
}

export function RowButton({onPress, text}: ButtonProps) {
    return (
        <Pressable style={styles.rowContainer} onPress={onPress}>
            <Text style={textStyles.addItemText}>
                {text}
            </Text>
        </Pressable>
    )
}

export function ColButton({onPress, text}: ButtonProps) {
    return (
        <Pressable style={styles.colContainer} onPress={onPress}>
            <Text style={textStyles.addItemText}>
                {text}
            </Text>
        </Pressable>
    )
}

export function ButtonTwoLine({onPress, text1, text2}: ButtonTwoLineProps) {
    return (
        <Pressable style={styles.colContainer} onPress={onPress}>
            <Text style={textStyles.addItemText}>
                {text1}
            </Text>
            <Text style={textStyles.addItemText}>
                {text2}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        borderRadius: itemConsts.borderRadius,
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: itemConsts.focusedColor,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    colContainer: {
        borderRadius: itemConsts.borderRadius,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: itemConsts.focusedColor,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
});