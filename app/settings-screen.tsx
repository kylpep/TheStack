import { deleteDBData } from "@/db/tinybaseActions";
import { basicTextStyles } from "@/styles/textStyles";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        }}>
            <Text style={basicTextStyles.body}>
                Settings Screen
            </Text>
            <Button title="Reset Database" onPress={deleteDBData}/>
        </View>
    )
}