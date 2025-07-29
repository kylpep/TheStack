import textStyles from "@/styles/textStyles";
import { Text } from "react-native";

type dateTextProps = {
    startDate?: number,
    includesStartTime?: boolean,
    endDate?: number,
    includesEndTime?: boolean,
}

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date) {
    return date.toDateString();
}

export default function ListItemDateText({ startDate, endDate, includesStartTime, includesEndTime }: dateTextProps) {
    let intro = "";
    let startTimeStr = "";
    let middle = "";
    let endTimeStr = "";

    // Prepare date objects and strings
    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;
    const todayStr = formatDate(new Date());
    const startStr = startDateObj ? formatDate(startDateObj) : "";
    const endStr = endDateObj ? formatDate(endDateObj) : "";
    const sameDay = startDateObj && endDateObj && startStr === endStr;
    const isTodayStart = startDateObj && startStr === todayStr;
    const isTodayEnd = endDateObj && endStr === todayStr;

    // Intro section
    if (startDate && !endDate) {
        intro = "Due by ";
    } else if (endDate && !startDate) {
        intro = includesEndTime ? "Do at " : "Do ";
    } else if (startDate && endDate && !includesStartTime && includesEndTime && sameDay) {
        intro = "SoD";
    }

    // Start time section
    if (startDate) {
        if (endDate) {
            startTimeStr = includesStartTime ? formatTime(startDateObj!) : "";
        } else {
            startTimeStr = includesStartTime ? formatTime(startDateObj!) : "";
        }
    } else if (endDate && includesEndTime) {
        startTimeStr = formatTime(endDateObj!);
    }

    // Middle section
    if (startDate && endDate) {
        if (includesStartTime && includesEndTime) {
            middle = sameDay ? " to " : ` ${isTodayStart ? "Today" : startStr} to `;
        } else if (includesStartTime && !includesEndTime) {
            middle = sameDay ? " to EoD " : ` ${isTodayStart ? "Today" : startStr} to `;
        } else if (!includesStartTime && includesEndTime) {
            middle = " to ";
        } else {
            middle = sameDay ? "" : " to ";
        }
    } else if ((startDate && !endDate && includesStartTime) || (endDate && !startDate && includesEndTime)) {
        middle = " ";
    }

    // End time section
    if (startDate && endDate) {
        if (includesStartTime && includesEndTime) {
            endTimeStr = sameDay
                ? `${isTodayStart ? "Today" : startStr}`
                : `${formatTime(endDateObj!)} ${endStr}`;
        } else if (includesStartTime && !includesEndTime) {
            endTimeStr = sameDay
                ? (isTodayStart ? "Today" : startStr)
                : endStr;
        } else if (!includesStartTime && includesEndTime) {
            endTimeStr = `${formatTime(endDateObj!)} ${isTodayEnd ? "Today" : endStr}`;
        } else {
            endTimeStr = sameDay ? "" : endStr;
        }
    } else if (startDate && !endDate) {
        endTimeStr = includesStartTime
            ? (isTodayStart ? "Today" : startStr)
            : (isTodayStart ? "EoD Today" : startStr);
    } else if (endDate && !startDate) {
        endTimeStr = includesEndTime
            ? (isTodayEnd ? "Today" : endStr)
            : (isTodayEnd ? "Today" : ("on " + endStr));
    }

    const dateString = `${intro}${startTimeStr}${middle}${endTimeStr}`.trim();

    return (
        (startDate || endDate) &&
        <Text style={textStyles.listItemDateText}>
            {dateString}
        </Text>
    );
}


