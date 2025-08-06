import { useCell } from "@/db/tinybase";
import { setActiveItemTitle } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { basicTextStyles } from "@/styles/textStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import CustomTextInput, { CustomTextInputHandle } from "../textInput";

type FileRouteHeaderProps = {
    folderNamePath: (string | undefined)[],
    parentId: string,
}

export default function FileRouteHeader({ folderNamePath: folderNameRoute, parentId }: FileRouteHeaderProps) {
    const escapeTo = useStorageScreenState(state => state.escapeTo);
    const escapeToRoot = useStorageScreenState(state => state.escapeToRoot);
    const useFolderName = () => (useCell("activeItems", parentId, "title"));
    const setAddFolder = useStorageScreenState(state => state.setAddFolder);
    const inputRef = useRef<CustomTextInputHandle>(null);

    const textStyle = basicTextStyles.title;


    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            {/* File Route */}
            <View key={"0"}style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap"
            }}>
                {/* Go back the root directory*/}
                <Pressable onPress={escapeToRoot} key="root">
                    <Text style={textStyle}>
                        {"Files"}
                    </Text>
                </Pressable>

                {/* Folders layers between current path and root directory
                    On press goes to pressed folder */}
                {parentId && (folderNameRoute.map((folderName, index) => (<>
                    <Ionicons name="chevron-forward" key={"c" + index}
                        color={textStyle.color}
                        size={textStyle.fontSize}
                    />
                    <Pressable onPress={() => escapeTo(index)} key={index}>
                        <Text style={textStyle}>
                            {folderName}
                        </Text>
                    </Pressable>
                </>))
                )}

                {/* Current folder, can be changed when edit button is pressed */}
                {parentId && <>
                    <Ionicons key={"c"} name="chevron-forward"
                        color={textStyle.color}
                        size={textStyle.fontSize}
                    />
                    <CustomTextInput
                        ref={inputRef}
                        storageHook={useFolderName}
                        setStorageValue={(text) => setActiveItemTitle(parentId, text)}
                        hasEditLock={true}
                        style={textStyle}
                        key={"input"}
                    />
                </>}


            </View>
            <View key={"1"} style={{
                flexDirection: "row",
                gap: 10,

            }}>
                {parentId &&
                    <Pressable onPress={inputRef.current?.focus} key={"2"}>
                        <Ionicons name="pencil" color={textStyle.color} size={textStyle.fontSize} />
                    </Pressable>
                }
                <Pressable onPress={() => setAddFolder(true)} key={"3"}>
                    <Ionicons name="add" color={textStyle.color} size={textStyle.fontSize} />
                </Pressable>
            </View>
        </View>
    )
}
