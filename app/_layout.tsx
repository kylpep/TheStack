
import { boot, itemTagRelationship, tbStore, Provider as TinybaseProvider } from "@/db/tinybase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await boot();
      setReady(true);
    })();
  }, []);

  if(!ready) return null;

  return (
    <TinybaseProvider store={tbStore} relationships={itemTagRelationship}>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="(bottom-tabs)" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="(top-tabs)/search-screen"
          options={{
            title: 'Search',
            headerBackTitle: 'Back',
          }} />
        <Stack.Screen name="(top-tabs)/settings-screen"
          options={{
            title: 'Settings',
            headerBackTitle: 'Back',
          }} />
      </Stack>

      <StatusBar style="light" />
    </TinybaseProvider>

  )
    ;
}
