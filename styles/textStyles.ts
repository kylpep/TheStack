import { StyleSheet } from "react-native";

const config = {
    textBaseSize: 15
}

const textStyles = StyleSheet.create({
    listItemTitleText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize,
        fontWeight: 'bold',
    },
    listItemDateText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize,
    },
    listItemNotesText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize,
    },
    listItemTagText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize,
        backgroundColor: "#a00000ff",

        borderRadius: 5,
    },
    fileHeaderText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
    },
    fileFolderText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
    },
    addItemText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize + 5,
    },
    addItemPlaceholderText:{
        color: "#a7a7a7ff",
    }
})

export default textStyles;