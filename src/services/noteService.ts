import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  results: Note[];
  total: number;
  page: number;
  per_page: number;
}

export interface FetchNotesParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
}

export interface DeleteNoteResponse {
  id: string;
  deleted: boolean;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', { 
    params: {
      page: params.page || 1,
      per_page: params.per_page || 12,
      search: params.search
    } 
  });
  return response.data;
};

export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
};