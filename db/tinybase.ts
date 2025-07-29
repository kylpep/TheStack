import { openDatabaseSync } from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { Store } from 'tinybase/store';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createRelationships, createStore } from 'tinybase/with-schemas';

//Define Schemas
const tablesSchema = {
    activeItems: {
        parentId: { type: "string"},
        itemType: { type: "number"},

        title: { type: "string" },
        notes: { type: "string" },
        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },

        completionTimeStamp: { type: "number" },
        includesStartTime: { type: "boolean", default: false },
        includesEndTime: { type: "boolean", default: false },
    },
    draftedItems: {
        parentId: { type: "string"},

        title: { type: "string" },
        notes: { type: "string", default: "" },

        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },
    },
    dayAssignment: {
        itemId: { type: "string" },
        assignedDate: { type: "number" },
        focused: { type: "boolean" },
    },
    tagAssignment: {
        itemId: { type: "string" },
        tag: { type: "string" },
    },
    tagStyle: {
        tag: { type: "string" },
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
const itemTagRelationship = createRelationships(tbStore).setRelationshipDefinition(
    "itemTags",
    "tagAssignment",
    "activeItems",
    "itemId"
);

export const boot = async () => {
  const db = openDatabaseSync('active.db');
  const persister = createExpoSqlitePersister(tbStore as unknown as Store, db, "tinybase_persister");

  await persister.load();
  persister.startAutoSave();
};
export { itemTagRelationship, tbStore };
export const { useLocalRowIds, useRow, useHasRow, useRowIds, useValue, useCell, Provider } = TinybaseWithSchemas;



