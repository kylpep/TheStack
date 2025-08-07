import { useCell } from "@/db/tinybase";
import { setActiveItemTitle } from "@/db/tinybaseActions";
import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { basicTextStyles } from "@/styles/textStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import CustomTextInput, { CustomTextInputHandle } from "../customTextInput";

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
            paddingHorizontal: 10,
        }}>
            {/* File Route */}
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap"
            }}>
                {/* Go back the root directory*/}
                <Pressable onPress={escapeToRoot}>
                    <Text style={textStyle}>
                        {"Files"}
                    </Text>
                </Pressable>

                {/* Folders layers between current path and root directory
                    On press goes to pressed folder */}
                {parentId && (folderNameRoute.map((folderName, index) => (<React.Fragment key="path">
                    <Ionicons name="chevron-forward"
                        color={textStyle.color}
                        size={textStyle.fontSize}
                    />
                    <Pressable onPress={() => escapeTo(index)}>
                        <Text style={textStyle}>
                            {folderName}
                        </Text>
                    </Pressable>
                </React.Fragment>))
                )}

                {/* Current folder, can be changed when edit button is pressed */}
                {parentId && <>
                    <Ionicons name="chevron-forward"
                        color={textStyle.color}
                        size={textStyle.fontSize}
                    />
                    <CustomTextInput
                        ref={inputRef}
                        storageHook={useFolderName}
                        setStorageValue={(text) => setActiveItemTitle(parentId, text)}
                        hasEditLock={true}
                        style={textStyle}
                    />
                </>}


            </View>
            <View style={{
                flexDirection: "row",
                gap: 10,

            }}>
                {/* Button to edit the name of the current folder */}
                {parentId &&
                    <Pressable onPress={() => inputRef.current?.focus()}>
                        <Ionicons name="pencil" color={textStyle.color} size={textStyle.fontSize} />
                    </Pressable>
                }
                {/* Button to add a folder under the current folder */}
                <Pressable onPress={() => setAddFolder(true)}>
                    <Ionicons name="add" color={textStyle.color} size={textStyle.fontSize} />
                </Pressable>
            </View>
        </View>
    )
}
