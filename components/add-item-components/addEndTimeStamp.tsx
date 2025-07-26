import CalendarSelecter from "@/components/add-item-components/calendarSelecter";
import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ITEMS_WITH_END } from "@/types/types";

export default function addEndTimeStamp() {
    const focus = useAddItemStore(state => state.focus);
    const setFocus = useAddItemStore(state => state.setFocus);

    const includeTime = useAddItemStore(state => state.includeEndTime);
    const setIncludeTime = useAddItemStore(state => state.setIncludeEndTime);

    const timeStamp = useAddItemStore(state => state.end);
    const setTimeStamp = useAddItemStore(state => state.setEnd);

    const itemType = useAddItemStore(state => state.itemType);
    const disabled = !ITEMS_WITH_END.includes(itemType);

    return (
        <CalendarSelecter
        contextText="End"
        focus={focus}
        timeFocus="endTime"
        dateFocus="endDate"
        setFocus={setFocus}
        includeTime={includeTime}
        setIncludeTime={setIncludeTime}
        currentTimeStamp={timeStamp}
        setTimeStamp={setTimeStamp}
        disabled={disabled}
        />
            
    )

};
