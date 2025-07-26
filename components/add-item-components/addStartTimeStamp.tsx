import CalendarSelecter from "@/components/add-item-components/calendarSelecter";
import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ITEMS_WITH_START } from "@/types";

export default function addStartTimeStamp() {
    const focus = useAddItemStore(state => state.focus);
    const setFocus = useAddItemStore(state => state.setFocus);

    const includeTime = useAddItemStore(state => state.includeStartTime);
    const setIncludeTime = useAddItemStore(state => state.setIncludeStartTime);

    const timeStamp = useAddItemStore(state => state.start);
    const setTimeStamp = useAddItemStore(state => state.setStart);

    const itemType = useAddItemStore(state => state.itemType);
    const disabled = !ITEMS_WITH_START.includes(itemType);

    return (
        <CalendarSelecter
        contextText="Start"
        focus={focus}
        timeFocus="startTime"
        dateFocus="startDate"
        setFocus={setFocus}
        includeTime={includeTime}
        setIncludeTime={setIncludeTime}
        currentTimeStamp={timeStamp}
        setTimeStamp={setTimeStamp}
        disabled={disabled}
        />
            
    )

};

