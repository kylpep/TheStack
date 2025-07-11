import { useRouter } from 'expo-router';
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>The Stack</Text>
      <Text>Loading Screen</Text>

      <Button title="Go to home screen" onPress={() => router.replace('./tagged-list-screen')}/>

    </View>
  );
}
