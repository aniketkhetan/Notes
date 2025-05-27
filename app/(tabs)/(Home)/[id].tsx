import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getNotes, updateNote, Note } from '@/lib/storage';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      const notes = await getNotes();
      const found = notes.find(n => n.id === id);
      if (found) {
        setNote(found);
        setText(found.content);
      }
    };
    loadNote();
  }, [id]);

  const handleSave = async () => {
    if (!note) return;
    const updated = { ...note, content: text };
    await updateNote(updated);
    router.back(); // go back to Home
  };

  if (!note) return null;

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        style={styles.input}
      />
      <Button title="Save Changes" onPress={handleSave} />
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
