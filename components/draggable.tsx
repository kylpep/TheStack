import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type draggableItemProps = {
    children: React.ReactNode;
    index:number;
    onDragEnd?: (index: number) => void
}

export default function DraggableItem({ children, index, onDragEnd }:draggableItemProps) {
    const translateY = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onBegin(() => {

        })
        .onUpdate((e)=> {
            translateY.value = e.translationY;
        })
        .onEnd(()=>{
            translateY.value = withSpring(0);
            onDragEnd?.(index);
        });

    const style = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}],
    }));

    return(
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[style,{flex:1, marginBottom: 10,}]}>
                {children}
            </Animated.View>
        </GestureDetector>
    )
}