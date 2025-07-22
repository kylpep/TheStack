import { openDatabaseSync } from 'expo-sqlite';
import { createStore } from 'tinybase';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';


const store = createStore().setTablesSchema({
    recentlyCompletedItems: {
        itemID: { type: "number" },
        parentID: { type: "number", default: -1 },
        itemType: { type: "number", default: -1 },

        title: { type: "string" },
        notes: { type: "string", default: "" },

        startTimeStamp: { type: "string" },
        endTimeStamp: { type: "string" },
        completionTimeStamp: { type: "string" },
    },
    activeItems: {
        itemID: { type: "number" },
        parentID: { type: "number", default: -1 },
        itemType: { type: "number", default: -1 },

        title: { type: "string" },
        notes: { type: "string", default: "" },
        focused: { type: "boolean", default: false },

        startTimeStamp: { type: "string" },
        endTimeStamp: { type: "string" },
    },
    draftedItems: {
        itemID: { type: "number" },
        parentID: { type: "number", default: -1 },

        title: { type: "string" },
        notes: { type: "string", default: "" },

        startTimeStamp: { type: "string" },
        endTimeStamp: { type: "string" },
    },
    dayAssignment: {
        itemID: { type: "number" },
        assignedDate: { type: "number" },
        focused: { type: "boolean" },
    },
    tagAssignment: {
        itemID: { type: "number" },
        parentID: { type: "number" },
    },
    tagStyle: {
        tagName: { type: "string" },
        tagColor: { type: "string" },
    }
});

const db = openDatabaseSync('active.db');

const persister = createExpoSqlitePersister(store, db,
    {
        mode: 'tabular',
        tables: {
            load: {
                recentlyCompletedItemsInDb: "recentlyCompletedItems",
                activeItemsInDb: "activeItems",
                draftedItemsInDb: "draftedItems",
                dayAssignmentInDb: "dayAssignment",
                tagAssignmentInDb: "tagAssignment",
                tagStyleInDb: "tagStyle",
            },
            save: {
                recentlyCompletedItems: "recentlyCompletedItemsInDb",
                activeItems: "activeItemsInDb",
                draftedItems: "draftedItemsInDb",
                dayAssignment: "dayAssignmentInDb",
                tagAssignment: "tagAssignmentInDb",
                tagStyle: "tagStyleInDb",
            }
        }
    }
);

await persister.startAutoPersisting();

export default store;