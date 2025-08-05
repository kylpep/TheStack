import { useStorageScreenState } from "@/states-zustand/storageScreenStates";
import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type FileRouteHeaderProps = {
    folderNameRoute: (string | undefined)[],
    parentId: string,
}

export default function FileRouteHeader({ folderNameRoute, parentId }: FileRouteHeaderProps) {
    const escapeTo = useStorageScreenState(state => state.escapeTo);
    const escapeToRoot = useStorageScreenState(state => state.escapeToRoot);
    

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap"
        }}>
            <Pressable onPress={escapeToRoot} key="root">
                <Text style={basicTextStyles.header}>
                    {"Files"}
                </Text>
            </Pressable>
            {parentId &&
                <>
                    <Ionicons name="chevron-forward"
                        color={theme.primaryColor}
                        size={basicTextStyles.header.fontSize}
                    />
                    {folderNameRoute.slice(0, folderNameRoute.length - 1).map((folderName, index) =>
                    (<>
                        <Pressable onPress={() => escapeTo(index)} key={index}>
                            <Text style={basicTextStyles.header}>
                                {folderName}
                            </Text>
                        </Pressable>
                        <Ionicons key={index + " "} name="chevron-forward"
                            color={theme.primaryColor}
                            size={basicTextStyles.header.fontSize}
                        />
                    </>)
                    )}
                    <Text style={basicTextStyles.header} key="end">
                        {folderNameRoute[folderNameRoute.length - 1]}
                    </Text>
                </>}
        </View>
    )
}
