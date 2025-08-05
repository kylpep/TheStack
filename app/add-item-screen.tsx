import AddItemView from "@/components/add-item-components/addItem";
import { theme } from "@/styles/themes";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddItemScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            flex: 1,
            paddingBottom: insets.bottom,
            alignItems: "center",
            paddingTop: 5,
        }}>
            <View style={{
                height: 5,
                width: 100,
                borderRadius: 5,
                backgroundColor: theme.primaryColor,
                
            }}/>
            <AddItemView />
        </View>
    )
}