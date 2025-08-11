import { dateTitle, dayIndexKey } from "@/lib/date-strings";
import { create } from "zustand";

interface ToDoState {
    selectedDate: Date;
    selectedDateKey: string;
    selectedDateTitle: string;

    setSelectedDateSlice: (dateSlice: string) => void;
}

export const useToDoState = create<ToDoState>()((set) => ({
    selectedDate: new Date(),
    selectedDateKey: dayIndexKey(Date.now()),
    selectedDateTitle: dateTitle(new Date()),
    setSelectedDateSlice: (dateSlice) => set({ selectedDateKey: dateSlice })
}));