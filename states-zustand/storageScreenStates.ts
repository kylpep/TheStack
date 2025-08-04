import { create } from "zustand";

interface StorageScreenState {
    folderPath: string[]
    traverseIntoFolder: (folderId: string) => void
    escapeTo: (folderLevel: number) => void
    escapeToRoot: () => void
}

export const useStorageScreenState = create<StorageScreenState>()((set, get) => ({
    folderPath: [],
    traverseIntoFolder: (folderId) => {
        set(state => ({
            folderPath: [...state.folderPath, folderId]
        }));
    },
    escapeToRoot: () => set(({ folderPath: [] })),
    escapeTo: (folderLevel) =>
        set(state => ({
            folderPath: state.folderPath.slice(0, folderLevel + 1)
        })),
}))