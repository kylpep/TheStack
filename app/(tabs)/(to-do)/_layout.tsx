import ToDoBar from "@/components/selector-components/toDoBar";
import { theme } from "@/styles/themes";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function ToDo() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
            paddingHorizontal: 5,
            alignItems: "stretch"
        }}
        >
            <ToDoBar />
            <Slot />
        </View>
    )
}