import { theme } from "@/styles/themes";
import { Href, usePathname, useRouter } from "expo-router";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type RouteBarProps = {
    options: ReactElement[];
    routes: Href[];
    gap: number;
    initialIndex: number;
}
const timingms = 500;
const easing = Easing.inOut(Easing.cubic);

const borderRadius = 15;

export default function RouteBar({ options, routes, gap, initialIndex }: RouteBarProps) {
    const router = useRouter();
    const pathname = usePathname() as Href;

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
            next[index] = { x: itemX, width: itemW };
            return next;
        });

        // Initialize highlight for first item
        if (index === initialIndex && !initialized) {
            x.value = itemX;
            w.value = itemW;
            setInitialized(true);
        }
    };

    // Slide highlight and navigate
    const onPress = (index: number) => {
        if (tabLayouts[index]) {
            x.value = withTiming(tabLayouts[index].x, { duration: timingms, easing: easing });
            w.value = withTiming(tabLayouts[index].width, { duration: timingms, easing: easing });
        }
        router.push(routes[index]);

    };

    useEffect(() => {
        const index = routes.indexOf(pathname);
        if (index > -1 && tabLayouts[index]) {
            x.value = withTiming(tabLayouts[index].x, { duration: timingms, easing: easing });
            w.value = withTiming(tabLayouts[index].width, { duration: timingms, easing: easing });
        }
    }, [pathname, tabLayouts]);

    return (
        <View style={[styles.container, { gap: gap, backgroundColor: "#1b1b1bff" }]}>
            <Animated.View style={[styles.highlight, highlightStyle]} />
            {options.map((option, index) => (
                <Pressable
                    key={index}
                    onLayout={(e) => onLayoutItem(index, e)}
                    onPress={() => onPress(index)}
                    style={[styles.itemWrapper]}
                >
                    {option}
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
        borderWidth: 0,
        borderColor: theme.itemBackgroundColor,
    },
    itemWrapper: {
        zIndex: 1,
    },
    highlight: {
        position: "absolute",
        height: 45,
        backgroundColor: theme.secondaryColor,
        borderRadius: borderRadius,
    },
});