import { useAddItemStore } from "@/states-zustand/addItemStates";
import { DayAssignmentType, ITEMS_WITH_END, ITEMS_WITH_START, itemToDayTypeConverter, ItemType } from "@/types/types";
import { EventItem } from "@howljs/calendar-kit";
import { tbIndexes, tbStore } from "./tinybase";

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
    const addItemStore = useAddItemStore.getState();

    const rowId = getNextIdAndIncrement();

    const { tags, includeBaseTime, includeEndTime, parentId } = addItemStore;

    const orderId = tbIndexes.getSliceRowIds("parentIdIndex", parentId ?? "undefined").length;

    let itemType = addItemStore.itemType;
    if (itemType === undefined) itemType = ItemType.Anytime;

    const assignedType = itemToDayTypeConverter(itemType, includeBaseTime);

    const rawTitle = addItemStore.title.trim();
    const title = (rawTitle === "") ? undefined : rawTitle;

    const rawNotes = addItemStore.notes.trim();
    const notes = (rawNotes === "") ? undefined : rawNotes;

    let rawStart = addItemStore.baseTimeStamp;
    const base = ITEMS_WITH_START.includes(itemType) ? rawStart?.getTime() : undefined;

    let rawEnd = addItemStore.end;
    const end = ITEMS_WITH_END.includes(itemType) ? rawEnd?.getTime() : undefined;

    tbStore.setRow("activeItems", rowId, {
        title: title,
        notes: notes,

        orderId: orderId,
        itemType: itemType,

        parentId: parentId,
        includesBaseTime: includeBaseTime,
        includesEndTime: includeEndTime,
    });

    if(itemType != ItemType.Anytime)
    tbStore.addRow("dayAssignment", {
        itemId: rowId,
        baseTimeStamp: base,
        endTimeStamp: end,
        assignementType: assignedType,
    });

    console.log("Assigned Type: " + assignedType)

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

export function setFileOrder(itemOrder: string[]) {
    itemOrder.forEach((itemId, index) => {
        tbStore.setCell("activeItems", itemId, "orderId", index);
    })
}

export function getScheduleEvent(dateId: string){
    const eventRow = tbStore.getRow("dayAssignment",dateId);
    const title = tbStore.getCell("activeItems",eventRow.itemId??"","title");
    const event: EventItem = {
        id: dateId,
        title: title??"Untitled",
        start: {dateTime: new Date(eventRow.baseTimeStamp??0).toISOString()},
        end: {dateTime: new Date(eventRow.endTimeStamp??0).toISOString()}
    }
    return event;
}

export function getFolderTitle(itemId: string) {
    return tbStore.getCell("activeItems", itemId, "title");
}

export function getToDoCategory(itemId: string) {
    const itemType = tbStore.getCell("activeItems", itemId, "itemType");

    if (itemType === ItemType.Anytime) return DayAssignmentType.AssignedDoOn;

}

export function setActiveItemTitle(itemId: string, newTitle: string) {
    if (tbStore.hasRow("activeItems", itemId) && newTitle.trim())
        tbStore.setCell("activeItems", itemId, "title", newTitle.trim());
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

export function setCompletionForActiveItem(itemId: string, completionStatus: boolean) {
    completionStatus ?
        tbStore.setCell("activeItems", itemId, "completionTimeStamp", Date.now()) :
        tbStore.delCell("activeItems", itemId, "completionTimeStamp")
}

export function addFolderToActive(folderName: string, parentId?: string) {
    const rowId = getNextIdAndIncrement();
    const orderId = tbIndexes.getSliceRowIds("parentIdIndex", parentId ?? "undefined").length;
    tbStore.setRow("activeItems", rowId, { title: folderName, parentId: parentId, orderId: orderId, itemType: ItemType.Folder });
}