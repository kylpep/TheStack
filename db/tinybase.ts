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
        itemType: { type: "number" },

        title: { type: "string" },
        notes: { type: "string" },
        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },

        completionTimeStamp: { type: "number" },
        includesStartTime: { type: "boolean", default: false },
        includesEndTime: { type: "boolean", default: false },
        orderId: {type: "number"}
    },
    draftedItems: {
        parentId: { type: "string" },

        title: { type: "string" },
        notes: { type: "string", default: "" },

        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },
    },
    dayAssignment: {
        itemId: { type: "string" },
        assignedTimeStamp: { type: "number" },
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
);

export const boot = async () => {
    const db = openDatabaseSync('active.db');
    const persister = createExpoSqlitePersister(tbStore as unknown as Store, db, "tinybase_persister");

    await persister.load();
    persister.startAutoSave();
};
export { relationships, tbIndexes, tbStore };
export const { useLocalRowIds, useTable, useRow, useHasRow, useRowIds, useValue, useCell, Provider, useSliceRowIds } = TinybaseWithSchemas;



