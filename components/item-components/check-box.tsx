import { useCell } from "@/db/tinybase";
import { setCompletionForActiveItem } from "@/db/tinybaseActions";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type checkBoxProps = {
    itemId: string,
}

export default function CheckBox({ itemId }: checkBoxProps) {
    const isComplete = !!useCell("activeItems", itemId, "completionTimeStamp");
    const setCompletion = (completionStatus: boolean) => 
        setCompletionForActiveItem(itemId, completionStatus)

    return (
        <Pressable onPress={() => setCompletion(!isComplete)}>
            {isComplete ?
                <Octicons name="check-circle-fill" color={theme.primaryColor} size={basicTextStyles.title.fontSize} /> :
                <Octicons name="circle" color={theme.primaryColor} size={basicTextStyles.title.fontSize} />
            }
        </Pressable>
    )
}