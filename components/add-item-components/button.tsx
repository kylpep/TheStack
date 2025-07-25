import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { Pressable, StyleSheet, Text } from "react-native";

type TagProps = {
    onPress: () => void;
    text: string;
}

export default function Button({onPress, text}: TagProps) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={textStyles.addItemText}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: itemConsts.borderRadius,
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: itemConsts.focusedColor,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
});