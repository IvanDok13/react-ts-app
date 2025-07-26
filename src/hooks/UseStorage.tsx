import { useCallback } from 'react';

const storageKey = 'searchTerm';

export const useStorage = () => {
  const setStorage = useCallback((searchTerm: string): void => {
    localStorage.setItem(storageKey, searchTerm.trim());
  }, []);

  const getStorage = useCallback((): string => {
    return localStorage.getItem(storageKey) || '';
  }, []);

  const clearStorage = useCallback((): void => {
    localStorage.removeItem(storageKey);
  }, []);

  return { setStorage, getStorage, clearStorage };
};
