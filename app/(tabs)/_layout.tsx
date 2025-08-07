import BottomButtons from '@/components/bottom-buttons';
import TopBar from '@/components/top-bar';
import { theme } from '@/styles/themes';
import { Ionicons } from '@expo/vector-icons/';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function TabLayout(props: any) {
    const router = useRouter();
    const [tabBarHeight, setTabBarHeight] = useState(0);


    return (
        <View style={{
            flex: 1,
            alignItems: "stretch"
        }}>
            <TopBar />
            <Tabs
                tabBar={(props) => (
                    <View onLayout={(e) => setTabBarHeight(e.nativeEvent.layout.height)}>
                        <BottomTabBar {...props} />
                    </View>
                )}
                screenOptions={{

                    tabBarStyle: {
                        backgroundColor: theme.backgroundColor,
                        borderColor: theme.secondaryColor,
                        borderTopWidth: 2,
                    },

                    animation: 'shift',
                    tabBarActiveTintColor: theme.primaryColor,

                    tabBarInactiveTintColor: theme.secondaryColor,

                    headerShown: false,
                }}
                safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
            >
                <Tabs.Screen
                    name="storage"
                    options={{
                        title: 'Files',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="file-tray-full" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(to-do)"
                    options={{
                        title: 'To-Do',
                        tabBarIcon: ({ color, size }) => (<Ionicons name="list" color={color} size={size} />),
                    }}
                />
                <Tabs.Screen
                    name="schedule"
                    options={{
                        title: 'Schedule',
                        tabBarIcon: ({ color, size }) => (<Ionicons name="calendar" color={color} size={size} />),
                    }}
                />
            </Tabs>
            <BottomButtons tabBarHeight={tabBarHeight} />
        </View>
    );
}