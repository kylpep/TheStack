import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ITEMS_WITH_END, ITEMS_WITH_START, ItemType } from "@/types/types";
import { tbStore } from "./tinybase";

function getNextIdAndIncrement() {
    const rowId = tbStore.getValue("nextId");
    tbStore.setValue("nextId", rowId + 1);
    return String(rowId);
}

export function deleteDBData() {
    tbStore.delTables();
    tbStore.setValue("nextId", 1);
}

export function addItemToActive() {
    const rowId = getNextIdAndIncrement();

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
    const start = ITEMS_WITH_START.includes(itemType) ? rawStart?.getTime() : undefined;

    let rawEnd = addItemStore.end;
    const end = ITEMS_WITH_END.includes(itemType) ? rawEnd?.getTime() : undefined;

    tbStore.setRow("activeItems", rowId, {
        title: title,
        notes: notes,

        startTimeStamp: start,
        endTimeStamp: end,

        parentId: parentId,
        includesStartTime: includeStartTime,
        includesEndTime: includeEndTime,
    })

    tags.forEach((tag) => {
        if (!tbStore.hasRow("tagStyle", tag)) {
            tbStore.setRow("tagStyle", tag, { tagColor: "normal" });
        }

        tbStore.addRow("tagAssignment", {
            tag: tag,
            itemId: rowId,
        });
    });
}

export function getFolderTitle(itemId: string) {
    return tbStore.getCell("activeItems", itemId, "title");
}

export function setActiveItemTitle(itemId: string, newTitle: string) {
    if (tbStore.hasRow("activeItems", itemId))
        tbStore.setCell("activeItems", itemId, "title", newTitle);
}

export function setActiveItemNotes(itemId: string, newNotes: string) {
    if (tbStore.hasRow("activeItems", itemId))
        tbStore.setCell("activeItems", itemId, "notes", newNotes);
}

export function getTagName(tagId: string) {
    return tbStore.getCell("tagAssignment", tagId, "tag");
}

export function getActiveItemFromTagId(tagId: string) {
    return tbStore.getCell("tagAssignment", tagId, "itemId");
}

export function getTagColor(tagName: string | undefined) {
    if (tagName)
        return tbStore.getCell("tagStyle", tagName, "tagColor");
}

export function setCompletionForActiveItem(itemId: string, completionStatus: boolean){
    completionStatus ?
    tbStore.setCell("activeItems", itemId, "completionTimeStamp", Date.now()) :
    tbStore.delCell("activeItems", itemId, "completionTimeStamp")
}

export function addFolderToActive(folderName: string, parentId?: string) {
    const rowId = getNextIdAndIncrement();
    tbStore.setRow("activeItems", rowId, { title: folderName, parentId: parentId, itemType: ItemType.Folder });
}