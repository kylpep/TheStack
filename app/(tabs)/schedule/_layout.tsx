import ScheduleBar from "@/components/scheduleBar";
import { theme } from "@/styles/themes";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function Schedule() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
        }}>
            <ScheduleBar />
            <Slot />
        </View>
    )
}
