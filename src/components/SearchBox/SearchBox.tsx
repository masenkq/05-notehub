import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'; // Використовуємо useDebounce замість useDebouncedValue
import css from './SearchBox.module.css';

export interface SearchBoxProps {
  onSearch: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Правильний хук

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBox;