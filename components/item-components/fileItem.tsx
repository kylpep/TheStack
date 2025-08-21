import { styleConsts } from "@/styles/styleConsts";
import { theme } from "@/styles/themes";
import { StyleSheet, View } from "react-native";
import CheckBox from "./check-box";
import DateText from "./full-date";
import NotesText from "./notes";
import TagText from "./tags";
import TitleText from "./title";

//TODO: Change params to be from external theme/style
//Add long press gesture
//Add Context menu for long press gesture
//Convert into a draggable component
//Hide when complete - timer? end of day? on app reload?
//Add repeatable event icon
//Add lock for template events
//Rename Component?


type itemBoxProps = {
    itemId: string | undefined;
}

export default function ItemBox({ itemId = ""}: itemBoxProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <TitleText itemId={itemId} />
                <DateText itemId={itemId} />
                <NotesText itemId={itemId} />
                <TagText itemId={itemId} />
            </View>
            <CheckBox itemId={itemId} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: styleConsts.itemBoxPaddingHorizontal,
        paddingVertical: styleConsts.itemBoxPaddingVertical,
        borderRadius: styleConsts.itemBorderRadius,
        backgroundColor: theme.gridColor,
        columnGap: styleConsts.itemColumnGap,
        marginVertical: styleConsts.itemMarginVertical,
    },
    textContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap',
        flexShrink: 1,
        gap: styleConsts.itemTextGap,
        flex: 1,
    },
});