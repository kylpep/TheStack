import CompactDayView from "@/components/to-do-components/compact-day-view";
import { useSliceIds } from "@/db/tinybase";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

export default function ToDoDayScreen() {
    const days = useSliceIds("dayIndex").filter((value) => value.length === 10);

    return (
        <View style={{
            backgroundColor: theme.backgroundColor,
            alignItems: "stretch",
            flex:1,
            borderColor: "red",
            borderWidth: 1,
        }}>
            <FlashList
                data={days}
                renderItem={({item}) => (
                    <CompactDayView dateKey={item}/>
                )}
                estimatedItemSize={50}
                ListEmptyComponent={
                    <Text style={[basicTextStyles.header,{paddingTop: 40}]}>
                        Add an item with a date to get started
                    </Text>
                }
            />
        </View>
    )
}