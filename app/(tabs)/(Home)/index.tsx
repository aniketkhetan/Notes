import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { getNotes, deleteNote, Note } from '@/lib/storage';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const loadNotes = useCallback(() => {
    getNotes().then(setNotes);
  }, []);

  useFocusEffect(loadNotes);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    loadNotes(); // refresh
  };

  const renderRightActions = (id: string) => (
    <Pressable style={styles.deleteSwipe} onPress={() => handleDelete(id)}>
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <Pressable
              onPress={() =>
                router.push({ pathname: '/(tabs)/(Home)/[id]', params: { id: item.id } })
              }
              style={styles.noteCard}
            >
              <Text style={styles.noteText} numberOfLines={2}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </Pressable>
          </Swipeable>
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => router.push('/(tabs)/(Home)/AddNotes')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
  noteCard: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 2,
  },
  noteText: { fontSize: 16 },
  timestamp: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: { fontSize: 28, color: 'white' },
  deleteSwipe: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginVertical: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
