import { create } from 'zustand';
import { AddItemFocus, ItemType } from './types';

interface AddItemState {
    title: string
    setTitle: (newTitle: string) => void;

    notes: string
    setNotes: (newNotes: string) => void;

    currentTag: string

    setCurrentTag: (newTagText: string) => void;

    startNewTag: () => void;

    removeTag: (index: number) => void;

    editTag: (index: number) => void;

    tags: string[]

    itemType: ItemType;
    setItemType: (newType: ItemType | undefined) => void;

    parentId: number
    setParentId: (newId: number) => void;

    includeStartTime: boolean
    setIncludeStartTime: (includeTime: boolean) => void;

    start: Date
    setStart: (newTimeStamp: Date) => void;

    includeEndTime: boolean
    setIncludeEndTime: (includeTime: boolean) => void;

    end: Date
    setEnd: (newTimeStamp: Date) => void;

    focus: AddItemFocus
    setFocus: (newFocus: AddItemFocus) => void;

}

export const useAddItemStore = create<AddItemState>()((set, get) => ({
    title: "",
    setTitle: (newTitle) => set({ title: newTitle }),

    notes: "",
    setNotes: (newNotes) => set({ notes: newNotes }),

    currentTag: "",

    setCurrentTag: (newTagText) => {
        if(newTagText !== " ")
        set({ currentTag: newTagText })
    },

    startNewTag: () => {
        if(get().currentTag != "")
        set(state => ({
            tags: [...state.tags, state.currentTag.trim()],
            currentTag: ""
        }));
    },

    removeTag: (index) => {
        set(state => ({
            tags: [
                ...state.tags.slice(0, index),
                ...state.tags.slice(index + 1)
            ]
        }));
    },

    editTag: (index) => {
        set(state => ({
            tags: [
                ...state.tags.slice(0, index),
                ...state.tags.slice(index + 1),
            ],
            currentTag: state.tags[index],
        }));
    },

    tags: [],

    itemType: ItemType.None,
    setItemType: (newItemType) => set({ itemType: newItemType }),

    parentId: 0,
    setParentId: (newId) => set({ parentId: newId }),

    includeStartTime: true,
    setIncludeStartTime: (includeTime) => set({includeStartTime: includeTime}),

    start: new Date(),
    setStart: (newTimeStamp) => set({ start: newTimeStamp }),

    includeEndTime: true,
    setIncludeEndTime: (includeTime) => set({includeEndTime: includeTime}),

    end: new Date(),
    setEnd: (newTimeStamp) => set({ end: newTimeStamp }),

    focus: "none",
    setFocus: (newFocus) => set({ focus: newFocus }),
}));