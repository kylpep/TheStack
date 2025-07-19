import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const completedItemArchive = sqliteTable("completedItemArchive",{
    itemID: integer().primaryKey(),
    parentID: integer(),
    startTimeStamp: integer({mode: 'timestamp'}),
    endTimeStamp: integer({mode: 'timestamp'}),
    completionTimeStamp: integer({mode: 'timestamp'}),
    notes: text(),
    title: text(),
});

const tagAssignmentArchive = sqliteTable("tagAssignmentArchive",{
    itemID: integer(),
    tagName: text(),
});

const dayAssignmentArchive = sqliteTable("dayAssignmentArchive",{
    itemID: integer(),
    assignedDate: integer({mode: 'timestamp'}),
});
