import { useAddItemStore } from "@/states-zustand/addItemStates";
import { ItemType } from "@/types/types";
import { tbStore } from "./tinybase";

function getNextIdAndIncrement(){
    const rowId = tbStore.getValue("nextId");
    tbStore.setValue("nextId", rowId + 1);
    return String(rowId);
}

export function deleteDBData(){
    tbStore.delTables();
    tbStore.delValues();
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
    const start = rawStart?.getTime();

    let rawEnd = addItemStore.end;
    const end = rawEnd?.getTime();


    tbStore.setRow("activeItems",rowId, {
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
            itemId: rowId,
        });
    });
}

export function setTitle(rowId: string, newTitle: string){
    if(tbStore.hasRow("activeItems", rowId))
        tbStore.setCell("activeItems",rowId,"title", newTitle);
}

export function setNotes(rowId: string, newNotes: string){
    if(tbStore.hasRow("activeItems", rowId))
        tbStore.setCell("activeItems",rowId,"notes", newNotes);
}

export function addFolderToActive(folderName: string, parentId?: string){
    const rowId = getNextIdAndIncrement();
    tbStore.setRow("activeItems", rowId,{title: folderName, parentId: parentId, itemType: ItemType.Folder});
}