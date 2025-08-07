import { addItemToActive } from "@/db/tinybaseActions";
import { useAddItemStore } from "@/states-zustand/addItemStates";
import { styleConsts } from "@/styles/styleConsts";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ButtonTwoLine, ColButton } from "./button";

export default function SubmissionButtons() {
    const reset = useAddItemStore(store => store.reset);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.buttonShelf}>
                <ColButton text="Save as Draft" onPress={() => {}} />
                <ButtonTwoLine text1="Save as Draft &" text2="Start New Item" onPress={() => { }} />
            </View>
            <View style={styles.buttonShelf}>
                <ColButton text="Add to Stack" onPress={() => {addItemToActive(); reset(); router.navigate}} />
                <ButtonTwoLine text1="Add to Stack &" text2="Start New Item" onPress={() => { addItemToActive(); reset(); }} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: styleConsts.gap,
        alignSelf: "flex-end",
        borderTopWidth: 2,
        borderColor: "white",
        padding: styleConsts.gap,
    },
    buttonShelf: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        gap: styleConsts.gap,
        flex: 1,
    },
})