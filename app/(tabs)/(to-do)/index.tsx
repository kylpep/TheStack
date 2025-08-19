import ItemsView from "@/components/to-do-components/items-view";
import { useToDoState } from "@/states-zustand/dateStates";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { ASSIGNMENT_INDEX_KEYS, DayAssignmentType, FOCUSED_KEY } from "@/types/types";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ToDoDayScreen() {
    const router = useRouter();
    const selectedDateTitle = useToDoState(state => state.selectedDateTitle);

    return (
        <View style={{
            backgroundColor: theme.backgroundColor,
            justifyContent: "flex-start",
            alignItems: "stretch",
            flex: 1,
            gap: 20,
            paddingTop: 5,
        }}>
            <Text style={[basicTextStyles.header, { alignSelf: "center" }]}>
                {selectedDateTitle}
            </Text>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: 5
                }}
            >
                <ItemsView assignmentKey={FOCUSED_KEY} title="Focused" />
                <ItemsView assignmentKey={ASSIGNMENT_INDEX_KEYS[DayAssignmentType.AssignedDoOn]} title="Assigned" />
                <ItemsView assignmentKey={ASSIGNMENT_INDEX_KEYS[DayAssignmentType.DoAt]} title="Do At" />
                <ItemsView assignmentKey={ASSIGNMENT_INDEX_KEYS[DayAssignmentType.DueBy]} title="Due By" />
                <ItemsView assignmentKey={ASSIGNMENT_INDEX_KEYS[DayAssignmentType.Event]} title="Event" />
            </ScrollView>
        </View>
    )
}