import { theme } from '@/styles/themes';
import { Ionicons } from '@expo/vector-icons/';
import { Tabs, useRouter } from 'expo-router';

export default function TabLayout(props: any) {
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.unfocusedTabIconColor,
                },
                animation: 'shift',
                tabBarActiveTintColor: theme.primaryTextColor,
                
                tabBarInactiveTintColor: theme.unfocusedTabIconColor,

                headerShown: false,
            }}
            safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
        >
            <Tabs.Screen
                name="storage"
                options={{
                    title: 'Files',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(to-do)"
                options={{
                    title: 'To-Do',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="timer" color={color} size={size} />),
                }}
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="pricetags" color={color} size={size} />),
                }}
            />

        </Tabs>
    );
}