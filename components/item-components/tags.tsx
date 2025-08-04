import { itemTagRelationship, useCell, useLocalRowIds } from "@/db/tinybase";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.
type tagsProps = {
    itemId: string;
}

export default function ListItemTagText({ itemId }: tagsProps) {
    const tagIds = useLocalRowIds("itemTags", itemId, itemTagRelationship);
    const tags = tagIds.map((tagId) => (useCell("tagAssignment", tagId, "tag")));
    const tagColors = tagIds.map((tagId) => (useCell("tagStyle", tagId, "tagColor")));

    return (
        <>{
            tags?.map((tag, index) => (
                <Text style={[
                    basicTextStyles.body,
                    { backgroundColor: tagColors[index]??theme.gridColor}
                ]}
                    key={index}>
                    {tag}
                </Text>
            ))}
        </>
    )
}


