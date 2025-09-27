export interface Note {
  id: string; // Змінено з _id на id
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}