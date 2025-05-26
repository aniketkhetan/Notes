import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { getNotes, Note } from '@/lib/storage';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getNotes().then(setNotes);
    }, [])
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>{item.content}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push("/(tabs)/(Home)/AddNotes")}>
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
    bottom:90,
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
});
