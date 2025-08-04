import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { theme } from "@/styles/themes";
import { StyleSheet, View } from "react-native";
import NoTagSelectedList from "./no-tag-selected";
import TagSelectedList from "./tag-selected";


export default function TagsView() {
    const currentTag = useStorageScreenState(state => state.currentTag);

    return (
        <View style={styles.container}>
            {currentTag ?
                <TagSelectedList currentTag={currentTag}/> :
                <NoTagSelectedList />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: theme.backgroundColor,
        rowGap: 10,
    }
})