import { useSliceRowIds } from "@/db/tinybase";
import { useToDoState } from "@/states-zustand/toDoStates";
import { basicTextStyles } from "@/styles/textStyles";
import { Text, View } from "react-native";
import ToDoItemBox from "./to-do-item-box";

type ItemsViewProps = {
    assignmentKey: string
    title: string
}


export default function ItemsView({assignmentKey, title}:ItemsViewProps) {
    const selectedDateKey = useToDoState(state => state.selectedDateKey);
    const sliceKey = selectedDateKey + assignmentKey;
    const itemIds = useSliceRowIds("dayIndex", sliceKey);

    return (
        <View style={{
            gap: 5
        }}>
            {itemIds.length > 0 &&
                <Text style={basicTextStyles.subHeader}>
                    {title}
                </Text>
            }
            {itemIds.map((itemId) =>
                <ToDoItemBox dateId={itemId} key={itemId + "_ToDo"} />
            )}
        </View>
    )
}