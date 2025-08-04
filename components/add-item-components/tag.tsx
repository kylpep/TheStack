import { styleConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { Ionicons } from '@expo/vector-icons/';
import { StyleSheet, Text, View } from "react-native";

type TagProps = {
    deletable: boolean;
    editable: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    name: string;
}

export default function Tag({deletable = false, onDelete, editable = false, onEdit, name }: TagProps) {
    return (
        <View style={styles.container}>
            <Text
                style={[textStyles.addItemText,{flexShrink: 1}]}
                onPress={editable ? onEdit : undefined}>
                {name}
            </Text>
            {deletable &&
                <Ionicons
                    name="close"
                    size={textStyles.addItemText.fontSize}
                    color="white"
                    onPress={onDelete}
                    style={styles.closeIcon}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: styleConsts.borderRadius,
        justifyContent: "flex-start",
        flexShrink: 1,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: styleConsts.focusedColor,
    },
    closeIcon: {
        
    }
});