import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { fetchNotes } from '../../services/noteService';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
}

function Pagination({ currentPage, onPageChange, searchQuery }: PaginationProps) {
  const { data } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes({ page: currentPage, perPage: 12, search: searchQuery }),
  });

  const totalPages = data?.totalPages || 0;

  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }): void => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="Previous"
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}

export default Pagination;