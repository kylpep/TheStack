import { theme } from '@/styles/themes';
import { Ionicons } from '@expo/vector-icons/';
import { Tabs, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout(props: any) {
    const router = useRouter();

    return (
        <View style={{
            flex: 1
        }}>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme.backgroundColor,
                        borderColor: theme.secondaryColor,
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
        </View>
    );
}