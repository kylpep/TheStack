import textStyles from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

//TODO: Add background to current screen button
//Add animation to screen selection button background
//Make the text style based on the theme(basicTextStyles)
//Change settings icon
//Adjust text size and icon size

export default function StorageBar(){
    const router = useRouter();

    return(
        <View style={{
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15
        }}>
            <Pressable onPress={() => router.push("/settings-screen")}>
                <Ionicons name="settings" color={theme.primaryColor} size={textStyles.fileHeaderText.fontSize}/>
            </Pressable>
            <Pressable onPress={() => router.navigate("/(tabs)/storage")}>
                <Text style={textStyles.fileHeaderText}>
                    Files
                </Text>
            </Pressable>
            <Pressable onPress={() => router.navigate("/(tabs)/storage/tags")}>
                <Text style={textStyles.fileHeaderText}>
                    Tags
                </Text>
            </Pressable>
            <Pressable onPress={() => router.push("/settings-screen")}>
                <Ionicons name="search" color={theme.primaryColor} size={textStyles.fileHeaderText.fontSize}/>
            </Pressable>
        </View>
    )
}