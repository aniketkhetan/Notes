import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Notes" }} />
      <Stack.Screen name="AddNotes" options={{title: "New Note"}} />
    </Stack>
  )
}