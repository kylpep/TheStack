

import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

//TODO: Add background to current screen button
//Add animation to screen selection button background
//Make the text style based on the theme(basicTextStyles)
//Change settings icon
//Adjust text size and icon size

const topBarHeight = 50;

export default function TopBar() {
    const router = useRouter();

    return (
        <View 
        pointerEvents="box-none"
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            position: "absolute",
            padding: 15,
            zIndex: 1,

        }}>
            <Pressable onPress={() => router.push("/settings-screen")}>
                <Ionicons name="settings-sharp" color={theme.primaryColor} size={20} />
            </Pressable>
            <Pressable onPress={() => router.push("/settings-screen")}>
                <Ionicons name="search" color={theme.primaryColor} size={20} />
            </Pressable>
        </View>
    )
}