import { useSliceRowIds } from "@/db/tinybase";
import { setFileOrder } from "@/db/tinybaseActions";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { Pressable } from "react-native-gesture-handler";
import SwipeableItem, { OpenDirection, SwipeableItemImperativeRef, useSwipeableItemParams } from "react-native-swipeable-item";
import ItemBox from "../item-components/fileItemBox";

type FilesProps = {
    parentId: string | undefined
}

type renderItemParams = {
    item: string,
    drag: () => void,
    isActive: boolean,
}

const UnderlayLeft = () => {
    const { close } = useSwipeableItemParams<renderItemParams>();
    return (
        <View style={styles.underlayLeft}>
            <Pressable onPress={() => close()}>
                <Ionicons name="trash" size={20} color={theme.primaryColor} style={{ paddingRight: 10 }} />
            </Pressable>
        </View>
    )
}

const UnderlayRight = () => {
    const { close, openDirection } = useSwipeableItemParams<renderItemParams>();
    if (openDirection === OpenDirection.RIGHT) {
        close();
    }
    return (
        <View style={styles.underlayRight}>
            <Text style={basicTextStyles.body}>
                Add to day
            </Text>
        </View>
    )
}

export default function FilesView({ parentId }: FilesProps) {
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");
    const currentSwipeRef = useRef<SwipeableItemImperativeRef>(null);

    const renderItem = ({ item, drag, isActive }: renderItemParams) => {
        const swipeRef = useRef<SwipeableItemImperativeRef>(null);

        return (
            <ScaleDecorator>
                <SwipeableItem
                    ref={swipeRef}
                    item={item}
                    activationThreshold={10}
                    snapPointsLeft={[40]}
                    snapPointsRight={[100]}
                    renderUnderlayLeft={() => <UnderlayLeft />}
                    renderUnderlayRight={() => <UnderlayRight />}
                    onChange={({ openDirection }) => {
                        if (openDirection !== OpenDirection.NONE) {
                            currentSwipeRef.current = swipeRef.current;
                        }
                    }}
                >
                    <Pressable
                        onLongPress={drag}
                        disabled={isActive}
                        onPress={() => swipeRef.current?.close()}
                    >
                        <ItemBox itemId={item} />
                    </Pressable>
                </SwipeableItem>
            </ScaleDecorator>
        )
    }

    // Handler for outside press
    const handleOutsidePress = () => {
        if (currentSwipeRef.current !== null) {
            currentSwipeRef.current.close();
            currentSwipeRef.current = null;
        }
    };

    return (
        <Pressable style={{ flex: 1 }} onPressIn={handleOutsidePress}>
            <View style={{ flex: 1, alignItems: "stretch" }}>
                <DraggableFlatList
                    data={itemIds}
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                    onDragEnd={({ data }) => { setFileOrder(data) }}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    underlayLeft: {
        marginVertical: 4,
        flex: 1,
        alignSelf: "stretch",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "red",
        borderRadius: 9,
    },
    underlayRight: {
        marginVertical: 4,
        flex: 1,
        paddingLeft: 5,
        alignSelf: "stretch",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: theme.secondaryColor,
        borderRadius: 9,
    }
})