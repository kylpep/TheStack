import { openDatabaseSync } from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { Store } from 'tinybase/store';
import { createStore } from 'tinybase/with-schemas';

const tbStore = createStore().setTablesSchema({
    recentlyCompletedItems: {
        parentId: { type: "number"},
        itemType: { type: "number"},

        title: { type: "string" },
        
        notes: { type: "string"},

        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },
        completionTimeStamp: { type: "number" },
    },
    activeItems: {
        parentId: { type: "string"},
        itemType: { type: "number"},

        title: { type: "string" },
        notes: { type: "string" },

        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },
    },
    draftedItems: {
        parentId: { type: "number", default: -1 },

        title: { type: "string" },
        notes: { type: "string", default: "" },

        startTimeStamp: { type: "number" },
        endTimeStamp: { type: "number" },
    },
    dayAssignment: {
        itemId: { type: "number" },
        assignedDate: { type: "number" },
        focused: { type: "boolean" },
    },
    tagAssignment: {
        itemId: { type: "number" },
        tag: { type: "string" },
    },
    tagStyle: {
        tag: { type: "string" },
        tagColor: { type: "string" },
    }
}).setValuesSchema({
    nextId: { type: "number", default: 1 },
});

const untypedStore = tbStore as unknown as Store;

const db = openDatabaseSync('active.db');

const persister = createExpoSqlitePersister(untypedStore, db, "tinybase_persister");

await persister.startAutoPersisting();

export default tbStore;