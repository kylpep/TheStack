import AddNotes from "@/components/add-item-components/addNotes";
import AddDate from "@/components/add-item-components/addStartDateTime";
import AddTags from "@/components/add-item-components/addTags";
import AddTitle from "@/components/add-item-components/addTitle";
import AddType from "@/components/add-item-components/addType";
import { View } from "react-native";

export default function AddItemView() {
    return (
        <View style={{
            justifyContent: "flex-start",
            alignItems: "stretch",
            backgroundColor: "#111111",
            flex: 1,
            padding: 10,
            rowGap: 10,
        }}>
            <AddTitle/>
            <AddNotes/>
            <AddTags/>
            <AddType/>
            <AddDate/>
            
        </View>
    );
}