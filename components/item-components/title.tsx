import { useCell } from "@/db/tinybase";
import { setActiveItemTitle } from "@/db/tinybaseActions";
import { styleConsts } from "@/styles/styleConsts";
import { basicTextStyles } from "@/styles/textStyles";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

//Calculate instead at app startup, if the day has changed
//since last launch, update a custom date string for the item
//if needed.

type titleProps = {
    itemId: string;
}

export default function ListItemTitleText({ itemId }: titleProps) {
    const title = useCell("activeItems", itemId, "title")??"";

    const setTitle = (newTitle: string) => setActiveItemTitle(itemId, newTitle);

    const [text, setText] = useState(title);


    useEffect(()=>{
        setText(title);
    }, [title])

    return (
        <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => setTitle(text.trim())}
            submitBehavior="blurAndSubmit"

            multiline={true}
            scrollEnabled={false}

            placeholder={"Untitled"}
            placeholderTextColor={basicTextStyles.title.color}

            style={[
                styles.input,
                basicTextStyles.title,
            ]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: styleConsts.borderRadius,
        flexShrink: 1,
        padding: 0,
    }
});