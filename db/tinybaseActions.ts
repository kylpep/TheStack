import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ITEMS_WITH_END, ITEMS_WITH_START, ItemType } from "@/types/types";
import tbStore from "./tinybase";

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
    if (rawStart !== undefined && ITEMS_WITH_START.includes(itemType))
        if (!includeStartTime)
            rawStart = new Date(rawStart.getFullYear(), rawStart.getMonth(), rawStart.getDate());
        else rawStart = undefined;
    const start = rawStart?.getTime();

    let rawEnd = addItemStore.end;
    if (rawEnd !== undefined && ITEMS_WITH_END.includes(itemType))
        if (!includeEndTime)
            rawEnd = new Date(rawEnd.getFullYear(), rawEnd.getMonth(), rawEnd.getDate());
        else rawStart = undefined;
    const end = rawEnd?.getTime();


    tbStore.setRow("activeItems", String(rowId), {
        title: title,
        notes: notes,

        startTimeStamp: start,
        endTimeStamp: end,

        parentId: parentId,
    })

    tags.forEach((tag) => {
        tbStore.addRow("tagAssignment", {
            tag: tag,
            itemId: rowId,
        });
    });
}