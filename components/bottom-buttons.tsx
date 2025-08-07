import { useAddItemStore } from "@/states-zustand/addItemStates";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type bottomButtonsProps = {
    tabBarHeight: number
}

export default function BottomButtons({ tabBarHeight }: bottomButtonsProps) {
    const setAddItemParentId = useAddItemStore(state => state.setParentId);
    const parentId = useStorageScreenState(state => state.currentFolder);
    const router = useRouter();

    return (
        <View style={[styles.container, {bottom: tabBarHeight}]} pointerEvents="box-none">
            <Pressable onPress={() => { setAddItemParentId(parentId); router.push("/add-item-screen") }}>
                <Ionicons name="add-circle" color={theme.primaryColor} size={50} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 15,
    }
})