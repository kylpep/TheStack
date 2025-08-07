import { StyleSheet } from "react-native";
import { styleConsts } from "./styleConsts";
import { theme } from "./themes";

const config = {
    textBaseSize: 15
}

export const basicTextStyles = StyleSheet.create({
    header: {
        color: theme.primaryColor,
        fontSize: styleConsts.textBaseSize * 2,
    },
    subHeader: {
        color: theme.primaryColor,
        fontSize: styleConsts.textBaseSize + 5,
    },
    title: {
        color: theme.primaryColor,
        fontSize: styleConsts.textBaseSize + 5,
    },
    placeholder: {
        color: theme.secondaryColor,
        fontSize: styleConsts.textBaseSize
    },
    body: { 
        color:theme.primaryColor,
        fontSize: styleConsts.textBaseSize
    }
})


const textStyles = StyleSheet.create({
    listItemTitleText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize,
        fontWeight: 'bold',
    },
    listItemDateText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize,
    },
    listItemNotesText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize,
    },
    listItemTagText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize,
        backgroundColor: "#a00000ff",

        borderRadius: 5,
    },
    fileHeaderText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
    },
    fileFolderText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
    },
    addItemText: {
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
        borderRadius: styleConsts.borderRadius,
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    addItemPlaceholderText: {
        color: "#a7a7a7ff",
        fontSize: config.textBaseSize + 5,
    }

})

export default textStyles;