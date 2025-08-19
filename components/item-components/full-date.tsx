import { useCell, useLocalRowIds } from "@/db/tinybase";
import { filesDateStringBuilder } from "@/lib/date-strings";
import { basicTextStyles } from "@/styles/textStyles";
import { itemTypeToStartStr } from "@/types/types";
import { Text, View } from "react-native";

//TODO 
// Add "This Fri"
// Add "Next Fri"
// Add year if year is not current year
// Make into button that lets you edit the time stuff
// Rename Component

type dateTextProps = {
    itemId: string
}

export default function ListItemDateText({ itemId }: dateTextProps) {
    const itemType = useCell("activeItems", itemId, "itemType");
    const dateId = useLocalRowIds("ItemDates", itemId);

    const baseTimeStamp = useCell("dayAssignment", dateId[0], "baseTimeStamp");
    const hasBaseTime = useCell("activeItems", itemId, "includesBaseTime");

    const endTimeStamp = useCell("dayAssignment", dateId[0], "endTimeStamp");
    const hasEndTime = useCell("activeItems", itemId, "includesEndTime");



    const baseStrings = filesDateStringBuilder(baseTimeStamp, hasBaseTime);
    const endStrings = filesDateStringBuilder(endTimeStamp, hasEndTime);

    const intro = itemTypeToStartStr(itemType, hasBaseTime, baseStrings.isRelative);

    const sameDay = baseStrings.dateStr === endStrings.dateStr;

    return (
        <View style={{
            flexDirection: "row",
            gap: 3,
        }}>
            {intro &&
                <Text style={basicTextStyles.body}>
                    {intro}
                </Text>
            }

            {baseStrings.timeStr &&
                <Text style={basicTextStyles.body}>
                    {baseStrings.timeStr}
                </Text>
            }

            {baseStrings.dateStr && !sameDay &&
                <Text style={basicTextStyles.body}>
                    {baseStrings.dateStr}
                </Text>
            }

            {baseTimeStamp && endTimeStamp && (hasBaseTime || hasEndTime || !sameDay) && 
                <Text style={basicTextStyles.body}>
                    {"-"}
                </Text>

            }

            {endStrings.timeStr &&
                <Text style={basicTextStyles.body}>
                    {endStrings.timeStr}
                </Text>
            }

            {endStrings.dateStr &&
                <Text style={basicTextStyles.body}>
                    {endStrings.dateStr}
                </Text>
            }
        </View>
    );
}


