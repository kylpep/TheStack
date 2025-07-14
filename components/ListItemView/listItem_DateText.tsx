import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

export default function ListItemDateText(props: any) {
    return (
        <Text style={textStyles.listItemDateText}>
            {"by 9:00pm Fri 11/27/25"}
        </Text>
    )
}


