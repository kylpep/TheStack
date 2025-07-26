import { itemConsts } from "@/styles/styleConsts";
import textStyles from "@/styles/textStyles";
import { AddItemFocus } from "@/types";
import { useRef } from 'react';
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

type calenderSelecterProps = {
    contextText: string
    focus: AddItemFocus
    timeFocus: AddItemFocus
    dateFocus: AddItemFocus
    disabled: boolean
    setFocus: (focus: AddItemFocus) => void;
    includeTime: boolean;
    setIncludeTime: (includeTime: boolean) => void;
    currentTimeStamp: Date;
    setTimeStamp: (timeStamp: Date) => void;
}

export default function CalendarSelecter({
    focus,
    contextText,
    timeFocus,
    dateFocus,
    setFocus,
    disabled,
    includeTime,
    setIncludeTime,
    currentTimeStamp,
    setTimeStamp }: calenderSelecterProps) {

    const isDateFocused = focus === dateFocus;
    const isTimeFocused = focus === timeFocus;
    const noFocus = "none"

    const defaultStyles = useDefaultStyles();
    const debounced = useRef(false);
    const debouncing = useRef(false);

    function changeSelectedTime(timeStamp: DateType) {
        if (debounced.current === false) {
            if (debouncing.current === false) {
                debouncing.current = true;
                setTimeout(() => {
                    debounced.current = true;
                    debouncing.current = false;
                }, 100);
            }
        }
        else if (timeStamp && typeof timeStamp === 'object' && 'toDateString' in timeStamp) {
            setTimeStamp(timeStamp);
        }
    }

    function changeSelectedDate(timeStamp: DateType) {
        if (timeStamp && typeof timeStamp === 'object' && 'toDateString' in timeStamp) {
            timeStamp.setHours(currentTimeStamp.getHours());
            timeStamp.setMinutes(currentTimeStamp.getMinutes());
            setTimeStamp(timeStamp);
        }
    }

    function toggleIncludeTime() {
        if (includeTime && isTimeFocused) {
            focusDate();
        }
        setIncludeTime(!includeTime);
    }

    function focusDate() {
        setFocus(isDateFocused ? noFocus : dateFocus);
    }

    function focusTime() {
        debounced.current = false;
        debouncing.current = false;
        setFocus(isTimeFocused ? noFocus : timeFocus);
    }

    function timeBackgroundColor() {
        return { backgroundColor: isTimeFocused ? "#333333" : "#111111" }
    }

    function dateBackgroundColor() {
        return { backgroundColor: isDateFocused ? "#333333" : "#111111" }
    }

    return (
        (!disabled) && <View style={styles.container}>
            <View style={styles.dateTimeContainer}>
                <Text style={textStyles.addItemText}>
                    {contextText + "s:"}
                </Text>
                <View style={styles.inputContainer}>
                    {includeTime &&
                        <Text style={[textStyles.addItemText, timeBackgroundColor(), { borderRadius: itemConsts.borderRadius }]} onPress={focusTime}>
                            {
                                currentTimeStamp.toLocaleTimeString([], { timeStyle: "short" })
                            }
                        </Text>
                    }
                    <Text style={[textStyles.addItemText, dateBackgroundColor(), { borderRadius: itemConsts.borderRadius }]} onPress={focusDate}>
                        {
                            currentTimeStamp.toDateString()
                        }
                    </Text>
                </View>
            </View>

            {(isDateFocused &&
                <DateTimePicker
                    containerHeight={textStyles.addItemText.fontSize * 10}
                    mode="single"
                    date={currentTimeStamp}
                    onChange={({ date }) => { changeSelectedDate(date) }}
                    styles={defaultStyles}

                    use12Hours={true}
                    showOutsideDays={true}
                    style={{
                        borderRadius: itemConsts.borderRadius * 2,
                        paddingHorizontal: 5,
                        backgroundColor: itemConsts.focusedColor,
                    }}
                />)}
           
                <DateTimePicker
                    mode="single"

                    date={currentTimeStamp}
                    onChange={({ date }) => { changeSelectedTime(date) }}
                    styles={defaultStyles}

                    timePicker={true}
                    initialView="time"
                    hideHeader={true}
                    use12Hours={true}
                    style={{
                        justifyContent: "center",
                        height: 200,
                        overflow: 'hidden',
                        display: isTimeFocused? "flex":"none",
                    }}
                />
            {(isDateFocused || isTimeFocused) &&
                <View style={styles.includeTimeContainer}>
                    <Text style={textStyles.addItemText} onPress={toggleIncludeTime}>
                        {"Has " + contextText + " Time:"}
                    </Text>
                    <Text style={textStyles.addItemText} onPress={toggleIncludeTime}>
                        {includeTime ? "Yes" : "No"}
                    </Text>
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: itemConsts.gap,
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        columnGap: 10,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
        flexGrow: 1,
        flex: 1,
    },
    calendar: {
        borderRadius: itemConsts.borderRadius * 2,
        paddingHorizontal: 5,
        backgroundColor: itemConsts.focusedColor,
    },
    timeSelect: {
        justifyContent: "center",
        height: 200,
        overflow: 'hidden',
    },
    includeTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});