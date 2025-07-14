import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

export default function ListItemTitleText(props: any) {
    return (
        <Text style={textStyles.listItemTitleText}>
            {"Working Title"}
        </Text>
    )
}