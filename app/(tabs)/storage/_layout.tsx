import { theme } from "@/styles/themes";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function Storage(){
    return(
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
            paddingHorizontal: 5,
        }}>
            <Slot/>
        </View>
    )
}