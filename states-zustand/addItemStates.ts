import { create } from 'zustand';
import { AddItemFocus, ItemType } from '../types/types';

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

    itemType: ItemType | undefined;
    setItemType: (newType: ItemType) => void;

    parentId: string | undefined;
    setParentId: (newId: string | undefined) => void;

    includeStartTime: boolean
    setIncludeStartTime: (includeTime: boolean) => void;

    start: Date | undefined
    setStart: (newTimeStamp: Date | undefined) => void;

    includeEndTime: boolean
    setIncludeEndTime: (includeTime: boolean) => void;

    end: Date | undefined
    setEnd: (newTimeStamp: Date | undefined) => void;

    focus: AddItemFocus
    setFocus: (newFocus: AddItemFocus) => void;

    reset: () => void;
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

    itemType: undefined,
    setItemType: (newItemType) => set({ itemType: newItemType }),

    parentId: undefined,
    setParentId: (newId) => set({ parentId: newId }),

    includeStartTime: true,
    setIncludeStartTime: (includeTime) => set({includeStartTime: includeTime}),

    start: undefined,
    setStart: (newTimeStamp) => {
        set({ start: newTimeStamp })
    },

    includeEndTime: true,
    setIncludeEndTime: (includeTime) => set({includeEndTime: includeTime}),

    end: undefined,
    setEnd: (newTimeStamp) => set({ end: newTimeStamp }),

    focus: "none",
    setFocus: (newFocus) => set({ focus: newFocus }),

    reset: () => {
        set({
            title: "",
            notes: "",
            currentTag: "",
            tags: [],
            itemType: undefined,
            parentId: undefined,
            includeStartTime: true,
            start: undefined,
            includeEndTime: true,
            end: undefined,
            focus: "none",
        });
    }
}));