import { useCell } from "@/db/tinybase";
import { basicTextStyles } from "@/styles/textStyles";
import { Text } from "react-native";

//TODO Rewrite date string construction by item type/ clean up current logic
// Add Tommorrow & Yesterday
// Add "This Fri"
// Add "Next Fri"
// Add year if year is not current year
// Make into button that lets you edit the time stuff
// Rename Component

type dateTextProps = {
    itemId: string
}
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

export default function ListItemDateText({ itemId }: dateTextProps) {
    let intro = "";
    let startTimeStr = "";
    let middle = "";
    let endTimeStr = "";

    const startTimeStamp = useCell("activeItems", itemId, "startTimeStamp");
    const hasStartTime = useCell("activeItems", itemId, "includesStartTime");

    const endTimeStamp = useCell("activeItems", itemId, "endTimeStamp");
    const hasEndTime = useCell("activeItems", itemId, "includesEndTime");


    // Prepare date objects and strings
    const startTimeStampObj = startTimeStamp ? new Date(startTimeStamp) : undefined;
    const endTimeStampObj = endTimeStamp ? new Date(endTimeStamp) : undefined;
    const todayStr = formatDate(new Date());
    const startStr = startTimeStampObj ? formatDate(startTimeStampObj) : "";
    const endStr = endTimeStampObj ? formatDate(endTimeStampObj) : "";
    const sameDay = startTimeStampObj && endTimeStampObj && startStr === endStr;
    const isStartThisYear = startTimeStampObj?.getFullYear() === new Date().getFullYear();
    const isEndThisYear = endTimeStampObj?.getFullYear() === new Date().getFullYear();
    const isTodayStart = startTimeStampObj && startStr === todayStr;
    const isTodayEnd = endTimeStampObj && endStr === todayStr;

    // Intro section
    if (startTimeStamp && !endTimeStamp) {
        intro = hasStartTime ? "Do at " : "Do ";
    } else if (endTimeStamp && !startTimeStamp) {
        intro = "Due by ";
    } else if (startTimeStamp && endTimeStamp && !hasStartTime && hasEndTime && sameDay) {
        intro = "SoD";
    }

    // Start time section
    if (startTimeStampObj) {
        if (endTimeStamp && sameDay) {
            startTimeStr = hasStartTime ? formatTime(startTimeStampObj) : "";
        } else {
            startTimeStr = hasStartTime ? formatTime(startTimeStampObj) : "";
        }
    } else if (endTimeStamp && hasEndTime) {
        startTimeStr = formatTime(endTimeStampObj!);
    }

    // Middle section
    if (startTimeStamp && endTimeStamp) {
        if (hasStartTime && hasEndTime) {
            middle = sameDay ? " to " : ` ${isTodayStart ? "Today" : startStr} to `;
        } else if (hasStartTime && !hasEndTime) {
            middle = sameDay ? " to EoD " : ` ${isTodayStart ? "Today" : startStr} to `;
        } else if (!hasStartTime && hasEndTime) {
            middle = " to ";
        } else {
            middle = sameDay ? "" : " to ";
        }
    } else if ((startTimeStamp && !endTimeStamp && hasStartTime) || (endTimeStamp && !startTimeStamp && hasEndTime)) {
        middle = " ";
    }

    // End time section
    if (startTimeStamp &&
        endTimeStamp) {
        if (hasStartTime && hasEndTime) {
            endTimeStr = sameDay
                ? `${isTodayStart ? "Today" : endStr}`
                : `${formatTime(endTimeStampObj!)} ${endStr}`;
        } else if (hasStartTime && !hasEndTime) {
            endTimeStr = sameDay
                ? (isTodayStart ? "Today" : startStr)
                : endStr;
        } else if (!hasStartTime && hasEndTime) {
            endTimeStr = `${formatTime(endTimeStampObj!)} ${isTodayEnd ? "Today" : endStr}`;
        } else {
            endTimeStr = sameDay ? "" : endStr;
        }
    } else if (startTimeStamp && !endTimeStamp) {
        endTimeStr = hasStartTime
            ? (isTodayStart ? "Today" : startStr)
            : (isTodayStart ? "Today" : ("on " + startStr));
    } else if (endTimeStamp && !startTimeStamp) {
        endTimeStr = hasEndTime
            ? (isTodayEnd ? "Today" : endStr)
            : (isTodayEnd ? "EoD Today" : endStr);
    }

    const dateString = `${intro}${startTimeStr}${middle}${endTimeStr}`.trim();

    return (
        (startTimeStamp || endTimeStamp) &&
        <Text style={basicTextStyles.body}>
            {dateString}
        </Text>
    );
}


