import { tbStore, useCell } from "@/db/tinybase";
import { theme } from "@/styles/themes";
import { ItemType } from "@/types/types";
import { StyleSheet, View } from "react-native";
import FileFolder from "../files-components/fileFolder";
import DateText from "./date";
import NotesText from "./notes";
import TagText from "./tags";
import TitleText from "./title";

const params = {
    paddingHorizontal: 10,
    paddingVertical: 6,
}

type itemBoxProps = {
    itemId: string;
}

//Flexes out horizontally
export default function ItemBox({ itemId }: itemBoxProps) {
    const isFolder = useCell("activeItems",itemId,"itemType") === ItemType.Folder;

    if(!tbStore.hasRow("activeItems", itemId)){
        return null;
    }

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: params.paddingHorizontal,
        paddingVertical: params.paddingVertical,
        borderRadius: 9,
        backgroundColor: theme.gridColor,
        columnGap: 10,
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