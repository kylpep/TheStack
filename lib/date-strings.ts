
export function weekdayTitle(targetDate: Date, controlDate: Date) {
    let weekday = "";
    const daysApart = Math.trunc((targetDate.getTime() - controlDate.getTime()) / 86400000);

    switch (daysApart) {
        case 0: weekday = "Today, "; break;
        case 1: weekday = "Tomorrow, "; break;
        case -1: weekday = "Yesterday, "; break;
        default: weekday = "";
    }

    if (daysApart >= -1 || daysApart <= -1) {
        weekday += controlDate.toLocaleDateString('en-US', { weekday: 'short' });
    }
    else {
        weekday += controlDate.toLocaleDateString('en-US', { weekday: 'long' });
    }

    return weekday;
}

function monthDate(targetDate: Date) {
    return targetDate.toLocaleDateString([], { month: "short" }) + " " +
        targetDate.toLocaleDateString([], { day: "numeric" });
}

//use memo day/slice
export function dateTitle(targetDate: Date) {
    const now = new Date();

    const title = weekdayTitle(targetDate, now) + " " + monthDate(targetDate);
    return title;
}


export const dayIndexKey = (epochMs: number) => {
    const d = new Date(epochMs);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
};