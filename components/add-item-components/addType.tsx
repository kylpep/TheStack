import { useAddItemStore } from "@/states";
import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { ItemType } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import { RowButton } from "./button";

const displayedTypeTextArray: string[] = ["Select", "anytime", "due by", "do at", "event", "flexable event", "soft event", "focused event"];

export default function addTypeView() {
    const itemType = useAddItemStore(store => store.itemType);
    const setFocus = useAddItemStore(store => store.setFocus);
    const setItemType = useAddItemStore(store => store.setItemType);
    const isFocused = useAddItemStore(state => state.focus === "itemType"); // updated selector
    const selectedItemStyle = (itemType === ItemType.None) ? textStyles.addItemPlaceholderText : textStyles.addItemText;
    const toggleFocus = () => setFocus(isFocused ? "none" : "itemType");

    const selectType = (newType: ItemType) => {
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
                        {displayedTypeTextArray[itemType]}
                    </Text>
                }

            </View>
            {isFocused &&
                <>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(1, 4).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index + 1)}/>
                        )}
                    </View>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(4, 6).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index + 4)}/>
                        )}
                    </View>
                    <View style={styles.buttonShelf}>
                        {displayedTypeTextArray.slice(6).map((text, index) =>
                            <RowButton text={text} key={index} onPress={() => selectType(index + 6)}/>
                        )}
                    </View>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: itemConsts.gap,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: itemConsts.gap,
    },
    buttonShelf: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: itemConsts.gap,
    },
    button: {
        borderRadius: itemConsts.borderRadius,
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: itemConsts.focusedColor,
        paddingHorizontal: 5,
        paddingVertical: 2,
    }

});