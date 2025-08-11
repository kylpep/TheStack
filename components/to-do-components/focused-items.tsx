import { useSliceRowIds } from "@/db/tinybase";
import { useToDoState } from "@/states-zustand/toDoStates";
import { basicTextStyles } from "@/styles/textStyles";
import { FOCUSED_KEY } from "@/types/types";
import { Text, View } from "react-native";
import ItemBox from "../item-components/itemBox";


export default function FocusedItemsView() {
    const selectedDateKey = useToDoState(state => state.selectedDateKey);
    const sliceKey = selectedDateKey + FOCUSED_KEY;
    const itemIds = useSliceRowIds("dayIndex", sliceKey);

    return (
        <View style={{
            
        }}>
            {itemIds.length > 0 &&
                <Text style={basicTextStyles.subHeader}>
                    Focused
                </Text>
            }
            {itemIds.map((itemId) =>
                <ItemBox itemId={itemId} key={itemId + "_ToDoFocus"} />
            )}
        </View>
    )
}