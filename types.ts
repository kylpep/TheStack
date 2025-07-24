
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

export type AddItemFocus = "title" 
| "notes"
| "tags" 
| "startDate" 
| "startTime" 
| "endDate" 
| "endTime" 
| "none";