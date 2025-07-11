import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="(bottom-tabs)" options={{
          headerShown:false,
        }}/>
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

      <StatusBar style="dark" />
    </>

  )
    ;
}
