import { useRowIds } from "@/db/tinybase";
import { theme } from "@/styles/themes";
import { StyleSheet, View } from "react-native";
import TagFolder from "./tag-folder";


export default function TagsView() {
    const tags = useRowIds("tagStyle")

    return (
        <View style={styles.container}>
            {tags.map((tag) => (
                <TagFolder tagName={tag} key={tag}/>
            ))}
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