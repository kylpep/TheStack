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
        fontSize: config.textBaseSize
    },
    listItemNotesText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize
    },
    listItemTagText:{
        color: "#eeeeee",
        fontSize: config.textBaseSize,
        borderColor: "#eeeeee",
        borderWidth: 1,
    }
})

export default textStyles;