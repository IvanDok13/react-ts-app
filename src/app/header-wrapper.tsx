'use client';

import { Header } from '@components/header/header';
import { RefetchButton } from '@components/refetch-btn';
import { useStorage } from '@hooks/UseStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function HeaderWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { getStorage } = useStorage();
  const [term, setTerm] = useState<string>('');

  useEffect(() => {
    const storedValue = getStorage();
    setTerm(storedValue);
  }, [getStorage]);

  const handleSearch = useCallback(
    (newTerm: string): void => {
      const trimmed = newTerm.trim();
      setTerm(trimmed);

      const newParams = new URLSearchParams(searchParams?.toString() ?? '');

      if (trimmed) {
        newParams.set('search', trimmed);
      } else {
        newParams.delete('search');
      }

      newParams.set('page', '1');
      newParams.delete('id');

      router.push(`/?${newParams.toString()}`);

      if (pathname !== '/') {
        router.push('/');
      }
    },
    [router, pathname, searchParams],
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <RefetchButton term={term} />
    </>
  );
}
