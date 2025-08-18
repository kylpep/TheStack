import { StyleSheet } from "react-native"
import { styleConsts } from "./styleConsts"
import { basicTextStyles } from "./textStyles"
import { theme } from "./themes"

//Style for folders in the files

export const folderStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: styleConsts.horizontalItemPadding,
        paddingVertical: styleConsts.verticalItemPadding,
        flexShrink: 1,
        marginVertical: 4,
        borderColor: theme.itemBackgroundColor,
        borderWidth: 2,
        borderRadius: 9,
    },
    text: basicTextStyles.subHeader
})