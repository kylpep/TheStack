import { useSliceRowIds } from "@/db/tinybase";
import { useToDoState } from "@/states-zustand/toDoStates";
import { basicTextStyles } from "@/styles/textStyles";
import { ASSIGNMENT_INDEX_KEYS, DayAssignmentType } from "@/types/types";
import { Text, View } from "react-native";
import ToDoItemBox from "./to-do-item-box";


export default function EventItemsView() {
    const selectedDateKey = useToDoState(state => state.selectedDateKey);
    const sliceKey = selectedDateKey + ASSIGNMENT_INDEX_KEYS[DayAssignmentType.Event];
    const itemIds = useSliceRowIds("dayIndex", sliceKey);

    return (
        <View style={{
            gap: 5
        }}>
            {itemIds.length > 0 &&
                <Text style={basicTextStyles.subHeader}>
                    Events
                </Text>
            }
            {itemIds.map((itemId) =>
                <ToDoItemBox dateId={itemId} key={itemId + "_ToDo"} />
            )}
        </View>
    )
}