import { useRowIds } from "@/db/tinybase";
import { StyleSheet, View } from "react-native";
import FileFolder from "../files-components/fileFolder";


export default function TagsView() {
    const tags = useRowIds("tagStyle")

    return (
        <View style={styles.container}>
            {tags.map((tag) => (
                <FileFolder text={tag} key={tag}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "stretch",
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: "#111111",
        rowGap: 10,
    }
})