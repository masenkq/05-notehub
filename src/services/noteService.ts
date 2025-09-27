import axios from 'axios';
import type { Note, CreateNoteData } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const noteService = {
  fetchNotes: async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>('/notes', { params }); // Додано дженерик
    return response.data;
  },

  createNote: async (noteData: CreateNoteData): Promise<Note> => {
    const response = await api.post<Note>('/notes', noteData); // Додано дженерик
    return response.data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`); // Додано дженерик
    return response.data;
  },
};