import textStyles from "@/styles/textStyles";
import { StyleSheet, Text, View } from "react-native";

const displayedTypeTextArray: string[] = ["anytime", "due by", "do at"];

export default function addTypeView() {


    return (
        <View style={styles.container}>
            <View>
              <Text style={textStyles.addItemText}>
                {"Item Type:"}
                </Text>
                  
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 10,
    },
});