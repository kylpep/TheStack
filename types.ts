
export enum ItemType {
    None,
    Anytime,
    DueBy,
    DoAtOn,
    Event,
    FlexableEvent,
    SoftEvent,
    FocusedEvent,
    Folder,
}

export type AddItemFocus = "title" 
| "notes"
| "tags"
| "itemType"
| "startDate" 
| "startTime" 
| "endDate" 
| "endTime" 
| "none";