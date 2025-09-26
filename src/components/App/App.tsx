import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noteService } from '../../services/noteService';
import type { CreateNoteData } from '../../types/note'; // type-only import
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  console.log('Modal state:', isModalOpen); // Додаємо лог для дебагу

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', currentPage, searchTerm],
    queryFn: () => noteService.fetchNotes({
      page: currentPage,
      perPage: 12,
      search: searchTerm || undefined,
    }),
  });

  const deleteMutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: noteService.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleCreateNote = (noteData: CreateNoteData) => {
    createMutation.mutate(noteData);
  };

  const handleOpenModal = () => {
    console.log('Opening modal'); // Додаємо лог
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Додаємо лог
    setIsModalOpen(false);
  };

  if (error) {
    return <div className={css.error}>Error loading notes: {(error as Error).message}</div>;
  }

  const notes = data?.data || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button 
          className={css.button}
          onClick={handleOpenModal}
        >
          Create note +
        </button>
      </header>

      {isLoading ? (
        <div className={css.loading}>Loading...</div>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      ) : (
        <div className={css.empty}>No notes found</div>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm
            onSubmit={handleCreateNote}
            onCancel={handleCloseModal}
            isLoading={createMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;