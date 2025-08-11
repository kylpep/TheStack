import { dateTitle, dayIndexKey, getDateFromKey } from "@/lib/date-strings";
import { create } from "zustand";

interface DateStates {
    selectedDate: Date;
    selectedDateKey: string;
    selectedDateTitle: string;

    handleDateSelection: (dateKey: string) => void;

}

export const useToDoState = create<DateStates>()((set) => ({
    selectedDate: new Date(),
    selectedDateKey: dayIndexKey(Date.now()),
    selectedDateTitle: dateTitle(new Date()),

    handleDateSelection: (dateKey) => {
        const date = getDateFromKey(dateKey);
        set({selectedDate: date,
            selectedDateKey: dateKey,
            selectedDateTitle: dateTitle(date),
        });
        
    }
}));