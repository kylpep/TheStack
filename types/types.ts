
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

export function itemToDayTypeConverter(itemType: ItemType, includeBaseTime: boolean):DayAssignmentType{
    switch(itemType){
        case ItemType.DoAtOn: 
            if(includeBaseTime)
                return DayAssignmentType.AssignedDoOn;
            return(DayAssignmentType.DoAt);
        case ItemType.DueBy:
            return DayAssignmentType.DueBy;
        case ItemType.Anytime:
            return DayAssignmentType.AssignedDoOn;
        default:
            return DayAssignmentType.Event;
    }
}

export enum DayAssignmentType {
    AssignedDoOn,
    DoAt,
    Event,
    DueBy,
}

export const FOCUSED_KEY = "_Focused";

export const ASSIGNMENT_INDEX_KEYS = [
    "_AssignedDoOn",
    "_DoAt",
    "_Event",
    "_DueBy",
]

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