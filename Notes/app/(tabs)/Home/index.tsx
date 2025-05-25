import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import AddNote from "./AddNote";

export default function NotesHome() {
  const router = useRouter();
    return (
        <View>
        <Text>Notes Home</Text>
        <Button
            title="Add Notes"
            onPress={() => router.push('/(tabs)/Home/AddNote')}
        />
        </View>
    );
}