import AddTitle from "@/components/add-item-components/addTitle";
import { View } from "react-native";

export default function AddItemScreen() {
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
        </View>
    );
}