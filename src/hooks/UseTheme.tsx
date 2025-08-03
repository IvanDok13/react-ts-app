import { useContext } from 'react';
import { ThemeContextType } from 'src/types/types';
import { ThemeContext } from '../context/themeContext';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be wrapped in ThemeProvider');
  return context;
}
