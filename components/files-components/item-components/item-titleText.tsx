import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

type titleProps = {
    title?: string;
}

export default function ListItemTitleText({ title }: titleProps) {
    return (
        <Text style={textStyles.listItemTitleText}>
            {title ?? "Untitled"}
        </Text>
    )
}