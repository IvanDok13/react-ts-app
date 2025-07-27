import styles from './pagination.module.css';

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: Props): JSX.Element {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageRange = () => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i += 1) {
      range.push(i);
    }

    return range;
  };

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <button type="button" onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </button>
      )}
      {getPageRange().map(page => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? styles.active : ''}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button type="button" onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </button>
      )}
    </nav>
  );
}
