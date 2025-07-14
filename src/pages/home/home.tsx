import type { FC } from 'react';
import styles from './home.module.css';

export const Home: FC = () => {
  return (
    <div className={styles.home}>
      <MainPage />
    </div>
  );
};
