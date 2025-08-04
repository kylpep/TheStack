import { useRowIds } from "@/db/tinybase";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import TagFolder from "./tag-folder";

export default function NoTagSelectedList() {
    const tags = useRowIds("tagStyle")
    const setTag = useStorageScreenState(state => state.setCurrentTag);

    return (
            tags.map((tag) => (
                <TagFolder tagName={tag} selectTag={() => setTag(tag)} key={tag} />
            ))
    )

}