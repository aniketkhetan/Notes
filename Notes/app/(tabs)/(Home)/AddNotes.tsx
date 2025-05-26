import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { saveNote } from '@/lib/storage'; 
import uuid from 'react-native-uuid'; 


export default function AddNoteScreen() {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSave = async () => {
  if (!text.trim()) return;

  try {
    await saveNote({
    id: uuid.v4().toString(), //  fix attempt #3
    content: text,
    timestamp: Date.now(),
    });
    console.log('Note saved:', text);
    router.back();
  } catch (err) {
    console.error("Error in handleSave:", err);
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your note..."
        value={text}
        onChangeText={setText}
        multiline
        style={styles.input}
      />
      <Button  title="Save Note" onPress={handleSave} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 0,
    padding: 15,
    borderRadius: 8,
    minHeight: 150,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});
