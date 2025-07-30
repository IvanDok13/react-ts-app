import { PAGE_BACK } from '@const/const';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './error.module.css';

export function ErrorPage(): ReactNode {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundText}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={() => navigate(PAGE_BACK)} className={styles.backButton}>
          Back
        </button>
        <button type="button" onClick={() => navigate('/')} className={styles.homeButton}>
          Home
        </button>
      </div>
    </div>
  );
}
