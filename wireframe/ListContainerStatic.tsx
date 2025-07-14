import { StyleSheet, View } from "react-native"
import ListItem from "./ListItem"

const staticList = [
    {
        title: "Item 1",
        notes: "These are the notes for the 1st item",
        key: "1",
    },
    {
        title: "Item 2",
        notes: "These are the notes for the 2nd item",
        key: "2",
    },
    {
        title: "Item 3",
        notes: "These are the notes for the 3rd item",
        key: "3",
    }
]

export default function ListContainerStatic() {
    return (
        <View style={styles.container} > {
            staticList.map(item => (
                <ListItem itemName={item.title} itemNotes={item.notes} />
            ))
        }</View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        flex: 1,
        borderWidth:0,
    }
})