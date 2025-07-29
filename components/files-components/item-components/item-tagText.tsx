import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.
type tagsProps = {
    tags?: string[];
}

export default function ListItemTagText({ tags }: tagsProps) {
    return (
        <>{
        tags?.map((tag, index) => {
            <Text style={textStyles.listItemTagText} key={index}>
                {tag}
            </Text>
        })}
        </>
    )
}


