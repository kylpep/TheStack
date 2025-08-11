import { dayIndexKey } from '@/lib/date-strings';
import { ASSIGNMENT_INDEX_KEYS, DayAssignmentType } from '@/types/types';
import { openDatabaseSync } from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { Store } from 'tinybase/store';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createIndexes, createRelationships, createStore } from 'tinybase/with-schemas';

//Define Schemas
const tablesSchema = {
    activeItems: {
        parentId: { type: "string" },
        itemType: { type: "number", default: 0 },

        title: { type: "string" },
        notes: { type: "string" },

        includesBaseTime: { type: "boolean", default: false },
        includesEndTime: { type: "boolean", default: false },

        completionTimeStamp: { type: "number" },
        dueBy: { type: "number" },

        orderId: { type: "number" }
    },

    //redefine
    draftedItems: {
        parentId: { type: "string" },

        title: { type: "string" },
        notes: { type: "string", default: "" },

        baseTimeStamp: { type: "number" },

        endTimeStamp: { type: "number" },
    },
    dayAssignment: {
        itemId: { type: "string" },

        assignementType: { type: "number" },

        baseTimeStamp: { type: "number" },

        endTimeStamp: { type: "number" },

        focused: { type: "boolean" },
    },
    tagAssignment: {
        itemId: { type: "string" },
        tag: { type: "string" },
    },
    //tag name is row id
    tagStyle: {
        tagColor: { type: "string" },
    }
} as const;

const valuesSchema = {
    nextId: { type: "number", default: 1 },
} as const;

//Apply Typing
const TinybaseWithSchemas = UiReact as unknown as WithSchemas<[typeof tablesSchema, typeof valuesSchema]>;

//Create Store
const tbStore = createStore().setTablesSchema(tablesSchema).setValuesSchema(valuesSchema);
const relationships = createRelationships(tbStore).setRelationshipDefinition(
    "itemTags",
    "tagAssignment",
    "activeItems",
    "itemId"
).setRelationshipDefinition(
    "tagItems",
    "tagAssignment",
    "tagStyle",
    "tag",
).setRelationshipDefinition(
    "ItemDates",
    "dayAssignment",
    "activeItems",
    "itemId",
);

const tbIndexes = createIndexes(tbStore).setIndexDefinition(
    "parentIdIndex",
    "activeItems",
    (getCell) => {
        const value = getCell("parentId");
        return value ?? "undefined";
    }
).setIndexDefinition(
    "tagItemIndex",
    "tagAssignment",
    (getCell) => {
        const value = getCell("tag");
        return value ?? "undefined";
    }
).setIndexDefinition(
    "dayIndex",
    "dayAssignment",
    (getCell) => {
        //Split into types
        const types: string[] = [];
        const focused = getCell("focused") ?? false;
        const assignedType = getCell("assignementType") ?? DayAssignmentType.AssignedDoOn;
        if (focused) types.push("_Focused");
        types.push(ASSIGNMENT_INDEX_KEYS[assignedType]);

        //Split into dates
        const dates: string[] = [];
        const base = getCell("baseTimeStamp") ?? 0;
        const end = getCell("endTimeStamp");
        if (end) {
            const endKey = dayIndexKey(end);

            let cur = base;
            let curKey = dayIndexKey(cur);

            while (curKey != endKey) {
                dates.push(curKey);
                cur += 86400000; //day in ms
                curKey = dayIndexKey(cur);
            }
            dates.push(endKey);
        }
        else dates.push(dayIndexKey(base));

        //Join
        const slices: string[] = [];
        dates.forEach((date) => {
            types.forEach((type) => {
                slices.push(date + type);
            })
            //Also add just the date.
            slices.push(date);
        })
        return slices;
    },
    
);

export const boot = async () => {
    const db = openDatabaseSync('active.db');
    const persister = createExpoSqlitePersister(tbStore as unknown as Store, db, "tinybase_persister");

    await persister.load();
    persister.startAutoSave();
};
export { relationships, tbIndexes, tbStore };

export const { 
    useLocalRowIds, 
    useSliceIds, 
    useTable, 
    useRemoteRowId, 
    useRow, 
    useHasRow, 
    useRowIds, 
    useValue, 
    useCell, 
    Provider, 
    useSliceRowIds } = TinybaseWithSchemas;



