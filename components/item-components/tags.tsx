import { useLocalRowIds } from "@/db/tinybase";
import { getTagColor, getTagName } from "@/db/tinybaseActions";
import { styleConsts } from "@/styles/styleConsts";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { StyleSheet, Text } from "react-native";

//TODO: make editable???
//Make some way to remove tags?

type tagsProps = {
    itemId: string;
}

export default function ListItemTagText({ itemId }: tagsProps) {
    const tagIds = useLocalRowIds("itemTags", itemId);
    const tags = tagIds.map((tagId) => getTagName(tagId));
    const tagColors = tags.map((tagName) => getTagColor(tagName));

    return (
        <>{
            tags?.map((tag, index) => (
                <Text style={[
                    basicTextStyles.body,
                    styles.container,
                    { backgroundColor: tagColors[index]??theme.gridColor}
                ]}
                    key={index}>
                    {tag}
                </Text>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: styleConsts.borderRadius,
        flexShrink: 1,
        padding: 2,
        borderWidth: 1,
        borderColor: theme.primaryColor,
    }
});


