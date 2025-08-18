import { Ionicons } from "@expo/vector-icons";
import { Href } from "expo-router";
import { View } from "react-native";
import RouteBar from "./routeBar";

const optionNames = ["calendar", "albums", "today"];

const options = optionNames.map((text) => {
    return (
        <View style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Ionicons name={text as any} size={30} color="white" />
        </View>
    )
});

const routes: Href[] = [
    "/month",
    "/multi-day",
    "/",
]

export default function ToDoBar() {
    return (
        <RouteBar
            gap={10}
            options={options}
            routes={routes}
            initialIndex={2}
        />
    )
}