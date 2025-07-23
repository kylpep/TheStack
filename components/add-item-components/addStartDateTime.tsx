import textStyles from "@/styles/textStyles";
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

export default function addStartDateTimeView() {
    const defaultStyles = useDefaultStyles();
    const [isDateFocused, setIsDateFocused] = useState(false);
    const [isTimeFocused, setIsTimeFocused] = useState(false);
    const [includeTime, setIncludeTime] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date);
    const debounced = useRef(false);
    const debouncing = useRef(false);

    function changeSelectedTime(date: DateType) {
        if (debounced.current === false) {
            if (debouncing.current === false) {
                debouncing.current = true;
                setTimeout(() => {
                    debounced.current = true;
                    debouncing.current = false;
                }, 100);
            }
        }
        else if (date && typeof date === 'object' && 'toDateString' in date) {
            setSelectedDate(date);
        }
    }

    function changeSelectedDate(date: DateType) {
        if (date && typeof date === 'object' && 'toDateString' in date) {
            date.setHours(selectedDate.getHours());
            date.setMinutes(selectedDate.getMinutes());
            setSelectedDate(date);
        }
    }

    function toggleIncludeTime() {
        if (includeTime) {
            setIsTimeFocused(false);
            setIsDateFocused(true);
        }
        setIncludeTime(!includeTime);
    }

    function focusDate() {
        setIsDateFocused(!isDateFocused);
        setIsTimeFocused(false);
    }

    function focusTime() {
        debounced.current = false;
        debouncing.current = false;
        setIsTimeFocused(!isTimeFocused);
        setIsDateFocused(false);
    }

    function timeBackgroundColor() {
        return { backgroundColor: isTimeFocused ? "#333333" : "#111111" }
    }

    function dateBackgroundColor() {
        return { backgroundColor: isDateFocused ? "#333333" : "#111111" }
    }

    return (
        <View style={styles.container}>
            <View style={styles.dateTimeContainer}>
                <Text style={textStyles.addItemText}>
                    {"Starts:"}
                </Text>
                <View style={styles.inputContainer}>
                    {includeTime &&
                        <Text style={[textStyles.addItemText, timeBackgroundColor()]} onPress={focusTime}>
                            {
                                selectedDate.toLocaleTimeString([], { timeStyle: "short" })
                            }
                        </Text>
                    }
                    <Text style={[textStyles.addItemText, dateBackgroundColor()]} onPress={focusDate}>
                        {
                            selectedDate.toDateString()
                        }
                    </Text>
                </View>
            </View>

            {(isDateFocused &&
                <DateTimePicker
                    mode="single"
                    date={selectedDate}
                    onChange={({ date }) => { changeSelectedDate(date) }}
                    styles={defaultStyles}

                    use12Hours={true}
                    showOutsideDays={true}
                    style={styles.calendar}
                />)}
            {(isTimeFocused &&
                <DateTimePicker
                    mode="single"

                    date={selectedDate}
                    onChange={({ date }) => { changeSelectedTime(date) }}

                    styles={defaultStyles}

                    timePicker={true}
                    initialView="time"
                    hideHeader={true}
                    use12Hours={true}
                    style={styles.calendar}
                />)}
            {(isDateFocused || isTimeFocused) &&
                <Text style={textStyles.addItemText} onPress={toggleIncludeTime}>
                    Include Start Time?
                </Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
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
        flexShrink: 1,
    }
});