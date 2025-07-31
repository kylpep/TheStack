import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ItemType } from "@/types/types";
import { tbStore } from "./tinybase";

export function addItemToActive() {
    const rowId = tbStore.getValue("nextId");
    tbStore.setValue("nextId", rowId + 1);

    const addItemStore = useAddItemStore.getState();
    const { tags, parentId, includeStartTime, includeEndTime } = addItemStore;

    let itemType = addItemStore.itemType;
    if (itemType === undefined)
        itemType = ItemType.Anytime;

    const rawTitle = addItemStore.title.trim();
    const title = (rawTitle === "") ? undefined : rawTitle;

    const rawNotes = addItemStore.notes.trim();
    const notes = (rawNotes === "") ? undefined : rawNotes;

    let rawStart = addItemStore.start;
    const start = rawStart?.getTime();

    let rawEnd = addItemStore.end;
    const end = rawEnd?.getTime();


    tbStore.setRow("activeItems", String(rowId), {
        title: title,
        notes: notes,

        startTimeStamp: start,
        endTimeStamp: end,

        parentId: parentId,
        includesStartTime: includeStartTime,
        includesEndTime: includeEndTime,
    })

    tags.forEach((tag) => {
        if(!tbStore.hasRow("tagStyle", tag)){
            tbStore.setRow("tagStyle", tag, {tagColor: "normal"});
        }

        tbStore.addRow("tagAssignment", {
            tag: tag,
            itemId: String(rowId),
        });
    });
}