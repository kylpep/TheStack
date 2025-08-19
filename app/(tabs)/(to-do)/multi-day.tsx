import CompactDayView from "@/components/to-do-components/compact-day-view";
import { useSliceIds } from "@/db/tinybase";
import { tempDateList } from "@/lib/date-strings";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

export default function ToDoDayScreen() {
    const days = useSliceIds("dayIndex").filter((value) => value.length === 10);
    const tempDays = tempDateList;

    return (
        <View style={{
            backgroundColor: theme.backgroundColor,
            alignItems: "stretch",
            flex: 1,
        }}>
            <FlashList
                data={tempDays}
                renderItem={({ item }) => (
                    <CompactDayView dateKey={item} />
                )}
                initialScrollIndex={93}
                estimatedItemSize={50}
                ListEmptyComponent={
                    <Text style={[basicTextStyles.body, { paddingVertical: 10}]}>
                        Add an item with a date to get started
                    </Text>
                }
            />
        </View>
    )
}