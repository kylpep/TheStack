import { useSliceRowIds } from "@/db/tinybase";
import { assignItemToDay, deleteItem, getItemType, setFileOrder } from "@/db/tinybaseActions";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { ItemType } from "@/types/types";
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

type underlayProps = {
    item: string;
}

const UnderlayLeft = ({ item }: underlayProps) => {
    const { close } = useSwipeableItemParams<renderItemParams>();

    const handlePress = () => {
        close();
        deleteItem(item);
    }
    return (
        <View style={styles.underlayLeft}>
            <Pressable onPress={() => handlePress()}>
                <Ionicons name="trash" size={20} color={theme.primaryColor} style={{ paddingRight: 10 }} />
            </Pressable>
        </View>
    )
}

const UnderlayRight = ({ item }: underlayProps) => {
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
                    swipeEnabled={getItemType(item) !== ItemType.Folder}
                    activationThreshold={10}
                    snapPointsLeft={[40]}
                    snapPointsRight={[100]}
                    renderUnderlayLeft={({ item }) => <UnderlayLeft item={item} />}
                    renderUnderlayRight={({ item }) => <UnderlayRight item={item} />}
                    onChange={({ openDirection }) => {
                        if (openDirection !== OpenDirection.NONE) {
                            currentSwipeRef.current = swipeRef.current;
                        }
                        if (openDirection === OpenDirection.RIGHT) {
                            assignItemToDay(item);
                            swipeRef.current?.close();
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