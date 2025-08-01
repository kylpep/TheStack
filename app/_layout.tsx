
import { boot, itemTagRelationship, tbStore, Provider as TinybaseProvider } from "@/db/tinybase";
import { theme } from "@/styles/themes";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

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
    <TinybaseProvider store={tbStore} relationships={itemTagRelationship}>
      <SafeAreaView  style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Stack screenOptions={{
          
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.backgroundColor
          }
        }}>
          <Stack.Screen name="(tabs)" options={{
            
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
        </Stack>

        <StatusBar style="light" />
      </SafeAreaView>
    </TinybaseProvider>

  )
    ;
}
