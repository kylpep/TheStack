import { theme } from '@/styles/themes';
import CalendarKit, { DeepPartial, ThemeConfigs } from '@howljs/calendar-kit';

export default function SingleDaySchedule() {
    return (
        <CalendarKit numberOfDays={1}
            theme={customTheme}
            hourFormat='h:mm a'
            allowPinchToZoom={true}
        />
    )
}

const customTheme: DeepPartial<ThemeConfigs> = {
    colors: {
        background: theme.backgroundColor,
        onBackground: theme.primaryColor,
        border: theme.gridColor,
        text: theme.primaryColor,
    }
}