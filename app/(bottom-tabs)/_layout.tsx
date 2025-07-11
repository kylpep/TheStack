import { Ionicons } from '@expo/vector-icons/';
import { Tabs, useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function TabLayout() {
    const router = useRouter();

    return (
        <Tabs screenOptions={{
            headerRight: () => (
                <Button title="Search" onPress={() => router.navigate("/search-screen")} />
            ),
            headerLeft: () => (
                <Button title="Settings" onPress={() => router.navigate("/settings-screen")} />
            ),
        }}>
            <Tabs.Screen
                name="focus-screen"
                options={{
                    title: 'Focus',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="timer" color={color} size={size} />),
                }}
            />
            <Tabs.Screen
                name="tagged-list-screen"
                options={{
                    title: 'Tagged Lists',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="pricetags" color={color} size={size} />),
                }}
            />
            <Tabs.Screen
                name="add-item-screen"
                options={{
                    title: 'New Item',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="add-circle" color={color} size={size} />),
                }}
            />
            <Tabs.Screen
                name="today-screen"
                options={{
                    title: 'Today',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="calendar" color={color} size={size} />),
                }}
            />
            
            <Tabs.Screen
                name='calendar-screen'
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ color, size }) => (<Ionicons name="calendar-number" color={color} size={size} />),
                }}
            />


        </Tabs>
    );
}