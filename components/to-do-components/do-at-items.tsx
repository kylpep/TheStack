import { useSliceRowIds } from "@/db/tinybase";
import { useToDoState } from "@/states-zustand/toDoStates";
import { basicTextStyles } from "@/styles/textStyles";
import { ASSIGNMENT_INDEX_KEYS, DayAssignmentType } from "@/types/types";
import { Text, View } from "react-native";
import ItemBox from "../item-components/itemBox";


export default function DoAtItemsView() {
    const selectedDateKey = useToDoState(state => state.selectedDateKey);
    const sliceKey = selectedDateKey + ASSIGNMENT_INDEX_KEYS[DayAssignmentType.DoAt];
    const itemIds = useSliceRowIds("dayIndex", sliceKey);

    return (
        <View style={{
            
        }}>
            {itemIds.length > 0 &&
                <Text style={basicTextStyles.subHeader}>
                    Do at
                </Text>
            }
            {itemIds.map((itemId) =>
                <ItemBox itemId={itemId} key={itemId + "_ToDo"} />
            )}
        </View>
    )
}