import ThinItemView from "@/components/ListItemView/ListItemView";
import { View } from "react-native";

export default function FocusScreen() {
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "stretch",
            flex: 1,
            flexDirection: 'column',
            padding: 10,
            backgroundColor: "#111111",
            rowGap: 10,
        }}>
                <ThinItemView />
        </View>
    );
}