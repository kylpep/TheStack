import { create } from "zustand";

interface StorageScreenState{
    folderPath: string[]
    traverseIntoFolder: (folderId: string) => void
    escapeTo: (folderLevel: number) => void
}

export const useStorageScreenState = create<StorageScreenState>()((set) => ({
    folderPath: [],
    traverseIntoFolder: (folderId) => 
        set(state => ({
            folderPath: [...state.folderPath,folderId]
        })),
    escapeTo: (folderLevel) => 
        set(state => ({
            folderPath: state.folderPath.slice(0, folderLevel)
        }))
}))