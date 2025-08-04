
import { boot, itemTagRelationship, tbIndexes, tbStore, Provider as TinybaseProvider } from "@/db/tinybase";
import { theme } from "@/styles/themes";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await boot();
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <TinybaseProvider store={tbStore}
      relationships={itemTagRelationship}
      indexes={tbIndexes}
    >
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
          <Stack screenOptions={{
            contentStyle: {
              backgroundColor: theme.backgroundColor
            },
            headerStyle: {
              backgroundColor: theme.backgroundColor

            },
            headerTitleStyle: {
              color: theme.primaryColor
            }
          }}>
            <Stack.Screen name="(tabs)"
              options={{
                headerShown: false,
              }} />
            <Stack.Screen name="search-screen"
              options={{
                title: 'Search',
                headerBackTitle: 'Back',
              }} />
            <Stack.Screen name="settings-screen"
              options={{
                title: 'Settings',
                headerBackTitle: 'Back',
              }} />
            <Stack.Screen name="add-item-screen"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
          </Stack>
          <StatusBar style="light" />
        </SafeAreaView>
      </GestureHandlerRootView>
    </TinybaseProvider>

  )
    ;
}
