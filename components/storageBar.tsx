import { basicTextStyles } from "@/styles/textStyles";
import { theme } from "@/styles/themes";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const OPTIONS = ["Files", "Tags"];
const ROUTES = ["/(tabs)/storage", "/(tabs)/storage/tags"];

const textStyle = basicTextStyles.header;
const textHorizontalPadding = 10;
const widthIncrease = textHorizontalPadding * 2;
const xPaddingOffset = textHorizontalPadding;
const timingms = 500;
const easing = Easing.inOut(Easing.cubic);

const borderRadius = 15;

export default function StorageBar() {
    const { width: screenWidth } = useWindowDimensions();
    const router = useRouter();

    //Use screen width to size the picker, because gap cannot be created with flexbox
    const dynamicMargin = screenWidth * 0.15;

    // Shared-values for highlight pos and width
    const x = useSharedValue(0);
    const w = useSharedValue(0);

    // Store x and width
    const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);

    // Only initialize once
    const [initialized, setInitialized] = useState(false);

    // Animated style
    const highlightStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }],
        width: w.value,
    }));

    // Called when each item lays out
    const onLayoutItem = (index: number, e: LayoutChangeEvent) => {
        const { x: itemX, width: itemW } = e.nativeEvent.layout;
        setTabLayouts((prev) => {
            const next = [...prev];
            next[index] = { x: itemX - xPaddingOffset, width: itemW + widthIncrease };
            return next;
        });

        // Initialize highlight for first item
        if (index === 0 && !initialized) {
            x.value = itemX - xPaddingOffset;
            w.value = itemW + widthIncrease;
            setInitialized(true);
        }
    };

    // Slide highlight and navigate
    const onPress = (index: number) => {
        if (tabLayouts[index]) {
            x.value = withTiming(tabLayouts[index].x, { duration: timingms, easing: easing });
            w.value = withTiming(tabLayouts[index].width, { duration: timingms, easing: easing });
        }
        router.push(ROUTES[index] as Href);
    };

    return (
        <View style={[styles.container, { gap: dynamicMargin }]}>
            <Animated.View style={[styles.highlight, highlightStyle]} />
            {OPTIONS.map((label, index) => (
                <Pressable
                    key={label}
                    onLayout={(e) => onLayoutItem(index, e)}
                    onPress={() => onPress(index)}
                    style={[styles.itemWrapper]}
                >
                    <Text style={textStyle}>{label}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: borderRadius,
        padding: 10,
        borderWidth: 0,
        borderColor: theme.itemBackgroundColor,
        paddingHorizontal: textHorizontalPadding,
    },
    itemWrapper: {
        zIndex: 1, // ensure text is on top of highlight
    },
    highlight: {
        position: "absolute",
        height: 45,
        backgroundColor: "#303030",
        borderRadius: borderRadius,
    },
});