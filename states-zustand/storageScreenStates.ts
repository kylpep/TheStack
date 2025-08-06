import { create } from "zustand";

interface StorageScreenState {
    folderPath: string[]
    currentFolder: string
    traverseIntoFolder: (folderId: string) => void
    escapeTo: (folderLevel: number) => void
    escapeToRoot: () => void

    currentTag: string
    setCurrentTag: (tag: string) => void
    resetCurrentTag: () => void

    addFolder: boolean
    setAddFolder: (bool: boolean) => void
}

export const useStorageScreenState = create<StorageScreenState>()((set, get) => ({
    folderPath: [],
    currentFolder: "",

    traverseIntoFolder: (folderId) => {
        set(state => ({
            folderPath: [...state.folderPath, state.currentFolder],
            currentFolder: folderId
        }));
    },

    escapeToRoot: () => set(({ folderPath: [], currentFolder: "" })),

    escapeTo: (folderLevel) =>
        set(state => ({
            currentFolder: state.folderPath[folderLevel],
            folderPath: state.folderPath.slice(0, folderLevel)
    })),

    currentTag: "",

    setCurrentTag: (tag) => set({ currentTag: tag }),
    
    resetCurrentTag: () => set({ currentTag: "" }),

    addFolder: false,
    setAddFolder: (bool) => set({addFolder: bool}),
}))