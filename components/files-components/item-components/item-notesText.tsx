import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

type notesProps = {
    notes?: string;
}

export default function ListItemNotesText({ notes }: notesProps) {
    return (
        notes &&
        <Text style={textStyles.listItemNotesText}>
            {notes}
        </Text>
    )
}


