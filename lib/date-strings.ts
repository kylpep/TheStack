
export function weekdayTitle(targetDate: Date, controlDate: Date) {
    let weekday = "";

    const temp = controlDate;

    const isToday = targetDate?.getDate() === temp.getDate() &&
        targetDate.getMonth() === temp.getMonth() &&
        targetDate.getFullYear() === temp.getFullYear();

    temp.setDate(temp.getDate() + 1);

    const isTomorrow = targetDate?.getDate() === temp.getDate() &&
        targetDate.getMonth() === temp.getMonth() &&
        targetDate.getFullYear() === temp.getFullYear();

    temp.setDate(temp.getDate() - 2);

    const isYesterday = targetDate?.getDate() === temp.getDate() &&
        targetDate.getMonth() === temp.getMonth() &&
        targetDate.getFullYear() === temp.getFullYear();

    if (isToday) weekday = "Today, "
    else if (isYesterday) weekday = "Yesterday, "
    else if (isTomorrow) weekday = "Tomorrow, "
    else weekday = "";

    // if (isToday || isTomorrow || isYesterday) {
    //     weekday += targetDate.toLocaleDateString('en-US', { weekday: 'short' });
    // }
    // else {
    //     weekday += targetDate.toLocaleDateString('en-US', { weekday: 'long' });
    // }
    weekday += targetDate.toLocaleDateString('en-US', { weekday: 'short' });

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



export function generateDates() {
    let date = new Date()
    date.setDate(date.getDate() - 100);
    let dates: string[] = [];
    for (let i = 1; i < 200; i++) {
        dates.push(dayIndexKey(date.getTime()));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
export const tempDateList = generateDates();
