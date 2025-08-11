import CalendarSelecter from "@/components/add-item-components/calendarSelecter";
import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ITEMS_WITH_START } from "@/types/types";

export default function addStartTimeStamp() {
    const focus = useAddItemStore(state => state.focus);
    const setFocus = useAddItemStore(state => state.setFocus);

    const includeTime = useAddItemStore(state => state.includeBaseTime);
    const setIncludeTime = useAddItemStore(state => state.setIncludeBaseTime);

    const timeStamp = useAddItemStore(state => state.baseTimeStamp);
    const setTimeStamp = useAddItemStore(state => state.setBaseTimeStamp);

    const disabled = useAddItemStore(state => state.itemType != undefined && !ITEMS_WITH_START.includes(state.itemType));

    return (
        timeStamp != undefined &&
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

