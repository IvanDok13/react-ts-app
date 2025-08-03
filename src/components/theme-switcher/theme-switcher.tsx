import { useTheme } from '@hooks/UseTheme';
import styles from './theme-switcher.module.css';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className={`theme-toggle ${theme}`} onClick={toggleTheme} aria-label="Toggle theme">
      <span className={styles.thumb}>{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  );
}
