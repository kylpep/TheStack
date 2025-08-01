import textStyles from "@/styles/textStyles";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function StorageBar(){
    const router = useRouter();

    return(
        <View style={{
            flexDirection:"row",
            justifyContent: "space-evenly",
        }}>
            <Pressable onPress={() => router.navigate("/(tabs)/storage/files")}>
                <Text style={textStyles.fileHeaderText}>
                    Files
                </Text>
            </Pressable>
            <Pressable onPress={() => router.navigate("/(tabs)/storage/tags")}>
                <Text style={textStyles.fileHeaderText}>
                    Tags
                </Text>
            </Pressable>
        </View>
    )
}