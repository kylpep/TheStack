import textStyles from "@/styles/textStyles";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ScheduleBar(){
    const router = useRouter();

    return(
        <View style={{
            flexDirection:"row",
            justifyContent: "space-evenly",
        }}>
            <Pressable onPress={() => router.navigate("/schedule/single-day")}>
                <Text style={textStyles.fileHeaderText}>
                    1 Day
                </Text>
            </Pressable>
            <Pressable onPress={() => router.navigate("/schedule/three-day")}>
                <Text style={textStyles.fileHeaderText}>
                    3 Day
                </Text>
            </Pressable>
            <Pressable onPress={() => router.navigate("/schedule/week")}>
                <Text style={textStyles.fileHeaderText}>
                    Week
                </Text>
            </Pressable>
        </View>
    )
}