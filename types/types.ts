
export enum ItemType {
    Anytime,
    DueBy,
    DoAtOn,
    Event,
    FlexableEvent,
    SoftEvent,
    FocusedEvent,
    Folder,
}

export const ITEMS_WITH_START = [
    ItemType.DoAtOn,
    ItemType.Event,
    ItemType.FlexableEvent,
    ItemType.SoftEvent,
    ItemType.FocusedEvent,
]

export const ITEMS_WITH_END = [
    ItemType.DueBy,
    ItemType.Event,
    ItemType.FlexableEvent,
    ItemType.SoftEvent,
    ItemType.FocusedEvent
]

export type AddItemFocus = "title" 
| "notes"
| "tags"
| "itemType"
| "startDate" 
| "startTime" 
| "endDate" 
| "endTime" 
| "none";

export type activeItemDisplayData = {
    parentId: number | undefined;
    itemType: ItemType | undefined;
    title: string | undefined;
    notes: string | undefined;
    startTimeStamp: number | undefined;
    endTimeStamp: number | undefined;
}