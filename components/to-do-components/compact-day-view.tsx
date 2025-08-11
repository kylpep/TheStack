import { useSliceRowIds } from "@/db/tinybase";
import { useToDoState } from "@/states-zustand/dateStates";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type CompactDayViewProps = {
    dateKey: string
}

export default function CompactDayView({ dateKey }: CompactDayViewProps) {
    const setDate = useToDoState(state => state.handleDateSelection);
    const router = useRouter();
    const dateRowIds = useSliceRowIds("dayIndex", dateKey);
    

    const handlePress = () => {
        setDate(dateKey);
        router.replace("/(tabs)/(to-do)");
    }

    return (
        <View style={{
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        }}>
            <Pressable onPress={handlePress}>
                <Text style={basicTextStyles.header}>
                    {dateKey}
                </Text>
            </Pressable>


        </View>
    )
}