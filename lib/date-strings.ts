
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

//Format: "YYYY-MM-DD"
export function getDateFromKey(dateKey: string) {
    const dateArgs = dateKey.split("-");
    return new Date(Number(dateArgs[0]), Number(dateArgs[1]) - 1, Number(dateArgs[2]));
}

export function filesDateStringBuilder(
    date?: string | number | Date,
    includeTime?: boolean) {

    let processedDate: Date | undefined;
    if (typeof date === "string")
        processedDate = getDateFromKey(date);
    else if (typeof date === "number")
        processedDate = new Date(date);
    else if (typeof date === "undefined")
        processedDate = undefined;
    else
        processedDate = date;

    const temp = new Date();

    const isToday = processedDate?.getDate() === temp.getDate() &&
        processedDate.getMonth() === temp.getMonth() &&
        processedDate.getFullYear() === temp.getFullYear();

    temp.setDate(temp.getDate() + 1);

    const isTomorrow = processedDate?.getDate() === temp.getDate() &&
        processedDate.getMonth() === temp.getMonth() &&
        processedDate.getFullYear() === temp.getFullYear();

    temp.setDate(temp.getDate() - 2);

    const isYesterday = processedDate?.getDate() === temp.getDate() &&
        processedDate.getMonth() === temp.getMonth() &&
        processedDate.getFullYear() === temp.getFullYear();

    const relativeDay = isToday ? "Today" :
        isTomorrow ? "Tom" :
            isYesterday ? "Yest" :
                undefined;

    const dateStr = relativeDay ?? (processedDate ? formatDate(processedDate) : undefined);

    const timeStr = includeTime ?
        (processedDate ? formatTime(processedDate) : undefined)
        : undefined;

    return {
        dateStr: dateStr,
        timeStr: timeStr,
        isRelative: !!relativeDay,
    }
};

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date) {
    return (
        date.toLocaleDateString([], {
            weekday: "short"
        }) + " " +
        date.toLocaleDateString([], {
            month: "numeric",
            day: "numeric",
        })
    );
}
