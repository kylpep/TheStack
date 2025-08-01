import { theme } from "@/styles/themes";
import { Text, View } from "react-native";

export default function ToDoDayScreen() {
    return (
        <View style={{
            backgroundColor: theme.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            flex:1,
        }}>
            <Text style={{color: theme.primaryTextColor}}>
                Home To Do Screen
            </Text>
        </View>
    )
}