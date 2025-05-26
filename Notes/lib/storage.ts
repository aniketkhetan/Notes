import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'NOTES';

export type Note = {
  id: string;
  content: string;
  timestamp: number;
};

export async function saveNote(note: Note) {
  try {
    const existing = await getNotes();
    const updated = [note, ...existing];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    console.log('Saved to AsyncStorage:', updated); // Debug log
  } catch (e) {
    console.error('saveNote error:', e);
  }
}

export async function getNotes(): Promise<Note[]> {
  try {
    const json = await AsyncStorage.getItem(NOTES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('getNotes error:', e);
    return [];
  }
}
