import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WireframeItem(props: any) {
    const [completionState, setCompletionState] = useState(false);
    const [collapsedState, setCollapsedState] = useState(true);
    const name = props.itemName;
    const notes = props.itemNotes;

    function handleCheckboxColor() {
        return { backgroundColor: completionState ? "#98f49bff" : "#dcdcdcff" };
    }
    function handleArrowDirection() {
        return collapsedState ? "chevron-up" : "chevron-down";
    }

    function handleCollapse() {
        return { disabled: collapsedState }
    }

    return (
        <View style={styles.container}>
            {/*Collapsed*/}
            <View style={styles.collapsedContainer}>

                {/*leftContainer*/}
                <View style={styles.leftSideContainer}>

                    {/*checkbox*/}
                    <Pressable onPress={() => setCompletionState(!completionState)}>
                        <View style={[styles.checkbox, handleCheckboxColor()]} />
                    </Pressable>

                    {/*title*/}
                    <View style={styles.titleContainer}>
                        <Text>
                            {name}
                        </Text>
                    </View>
                </View>

                {/*arrow*/}
                <Ionicons.Button
                    style={styles.arrow}
                    name={handleArrowDirection()}
                    size={20}
                    onPress={() => setCollapsedState(!collapsedState)}
                    color={"black"}
                    backgroundColor={"white"}
                />
            </View>
            { !collapsedState &&
                <View style={styles.notesContainer}>
                    <Text>
                        {notes}
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#fefefe",
        borderColor: "#2a2a2aff",
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 5,
    },
    collapsedContainer: {
        alignItems: "center",
        rowGap: 10,
        flexDirection: "row",
        maxHeight: 60,
        borderRadius: 5,
        justifyContent: "space-between",
        flex: 1,
    },
    leftSideContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    titleContainer: {

    },
    notesContainer: {
        marginTop: 8,
    },
    checkbox: {
        aspectRatio: 1,
        borderRadius: 5,
        flex: 1,
        maxHeight: 65,
        marginRight: 10
    },
    arrow: {
        aspectRatio: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 15,
    },
    notesText: {
        fontSize: 12,
    }
})