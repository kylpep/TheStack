import { useAddItemStore } from "@/states-zustand/addItemStates";
import { styleConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { ITEMS_WITH_START, ItemType } from "@/types/types";
import { StyleSheet, Text, View } from "react-native";
import { RowButton } from "./button";

const displayedTypeTextArray: string[] = ["Anytime", "Due by", "Do at", "Event", "Flexable Event", "Soft Event", "Focused Event"];

export default function addTypeView() {
    const itemType = useAddItemStore(store => store.itemType);
    const setFocus = useAddItemStore(store => store.setFocus);
    const setItemType = useAddItemStore(store => store.setItemType);
    const setStart = useAddItemStore(store => store.setStart);
    const startIsDefined = useAddItemStore(store => store.start !== undefined);
    const endIsDefined = useAddItemStore(store => store.end !== undefined);
    const setEnd = useAddItemStore(store => store.setEnd);
    const isFocused = useAddItemStore(state => state.focus === "itemType"); // updated selector
    const selectedItemStyle = (itemType === undefined) ? textStyles.addItemPlaceholderText : textStyles.addItemText;
    const toggleFocus = () => setFocus(isFocused ? "none" : "itemType");

    const selectType = (newType: ItemType) => {
        if(ITEMS_WITH_START.includes(newType) && !startIsDefined) setStart(new Date());
        if(ITEMS_WITH_START.includes(newType) && !endIsDefined) setEnd(new Date());
        setItemType(newType);
    };


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={textStyles.addItemText}>
                    {"Item Type:"}
                </Text>
                {
                    <Text style={selectedItemStyle} onPress={toggleFocus}>
                        {itemType !== undefined? displayedTypeTextArray[itemType]: "Select"}
                    </Text>
                }

            </View>
            {isFocused &&
                <>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(0, 3).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index)}/>
                        )}
                    </View>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(3, 5).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index + 3)}/>
                        )}
                    </View>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(5).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index + 4)}/>
                        )}
                    </View>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: styleConsts.gap,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: styleConsts.gap,
    },
    buttonShelf: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: styleConsts.gap,
    },
    button: {
        borderRadius: styleConsts.borderRadius,
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: styleConsts.focusedColor,
        paddingHorizontal: 5,
        paddingVertical: 2,
    }

});