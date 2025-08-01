import { theme } from '@/styles/themes';
import CalendarKit, { DeepPartial, ThemeConfigs } from '@howljs/calendar-kit';

export default function WeekSchedule() {
    return (
        <CalendarKit numberOfDays={7}
            theme={customTheme}
            hourFormat='h:mm a'
            allowPinchToZoom={true}
        />
    )
}

const customTheme: DeepPartial<ThemeConfigs> = {
    colors: {
        background: theme.backgroundColor,
        onBackground: theme.primaryTextColor,
        border: theme.foregroundColor,
        text: theme.primaryTextColor,
    }
}