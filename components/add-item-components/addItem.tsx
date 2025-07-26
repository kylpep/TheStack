import AddNotes from "@/components/add-item-components/addNotes";
import AddStartTimeStamp from "@/components/add-item-components/addStartTimeStamp";
import AddTags from "@/components/add-item-components/addTags";
import AddTitle from "@/components/add-item-components/addTitle";
import AddType from "@/components/add-item-components/addType";
import { ScrollView, View } from "react-native";
import AddEndTimeStamp from "./addEndTimeStamp";
import SubmissionButtons from "./submitButtons";

export default function AddItemView() {
    return (
        <View style={{
            backgroundColor: "#111111",
            flex: 1,
            justifyContent: "space-between",
            
        }}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps={"always"}
                contentContainerStyle={{
                    paddingVertical: 10,
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: 8,
                    padding: 10,
                    paddingBottom: 2,
                }}>
                <AddTitle />
                <AddNotes />
                <AddTags />
                <AddType />
                <AddStartTimeStamp />
                <AddEndTimeStamp />
            </ScrollView>
            <SubmissionButtons />
        </View>
    );
}