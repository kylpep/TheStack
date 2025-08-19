import { useSliceRowIds } from '@/db/tinybase';
import { getScheduleEvent } from '@/db/tinybaseActions';
import { theme } from '@/styles/themes';
import CalendarKit, { DeepPartial, EventItem, ThemeConfigs } from '@howljs/calendar-kit';

export default function WeekSchedule() {
    const dateIds = useSliceRowIds("dayIndex", "_Event");
    let events: EventItem[] = [];

    dateIds.forEach((dateId) => {
        events.push(getScheduleEvent(dateId));
    });

    return (
        <CalendarKit numberOfDays={7}
            theme={customTheme}
            hourFormat='h:mm a'
            allowPinchToZoom={true}
            events={events}
        />
    )
}

const customTheme: DeepPartial<ThemeConfigs> = {
    colors: {
        background: theme.backgroundColor,
        onBackground: theme.primaryColor,
        border: theme.gridColor,
        text: theme.primaryColor,
    },
    eventContainerStyle:{
        backgroundColor: theme.primaryColor,
    }
}