import CheckBox from "@/components/item-components/check-box";
import DateText from "@/components/item-components/full-date";
import NotesText from "@/components/item-components/notes";
import TagText from "@/components/item-components/tags";
import TitleText from "@/components/item-components/title";
import { tbStore, useCell } from "@/db/tinybase";
import { theme } from "@/styles/themes";
import { ItemType } from "@/types/types";
import { StyleSheet, View } from "react-native";
import FileFolder from "../files-components/fileFolder";

//TODO: Change params to be from external theme/style
//Add long press gesture
//Add Context menu for long press gesture
//Convert into a draggable component
//Hide when complete - timer? end of day? on app reload?
//Add repeatable event icon
//Add lock for template events
//Rename Component?



const params = {
    paddingHorizontal: 10,
    paddingVertical: 6,
}

type itemBoxProps = {
    dateId: string | undefined;
    showFolders?: boolean
}

//Flexes out horizontally
export default function ToDoItemBox({ dateId = "", showFolders=true }: itemBoxProps) {
    const itemId = useCell("dayAssignment",dateId,"itemId")??"";

    const isFolder = useCell("activeItems",itemId,"itemType") === ItemType.Folder;

    if(!tbStore.hasRow("activeItems", itemId)){
        return null;
    }

    if(isFolder && !showFolders) return null;

    if(isFolder){
        return(
          <FileFolder itemId={itemId}/>  
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <TitleText itemId={itemId}/>
                <DateText itemId={itemId}/>
                <NotesText itemId={itemId}/>
                <TagText itemId={itemId}/>
            </View>
            <CheckBox itemId={itemId}/>
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
        paddingHorizontal: params.paddingHorizontal,
        paddingVertical: params.paddingVertical,
        borderRadius: 9,
        backgroundColor: theme.gridColor,
        columnGap: 10,
        marginVertical: 4,
    },
    textContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap',
        flexShrink: 1,
        gap: 5,
        flex: 1,
    },
});