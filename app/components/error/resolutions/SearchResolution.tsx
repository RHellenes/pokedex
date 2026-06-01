'use client';

import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/app/components/pokemon/SearchBar';
import type { ErrorInfo } from 'next/error';

export function SearchResolution({ unstable_retry }: ErrorInfo) {
  const params = useSearchParams();
  return (
    <SearchBar
      defaultValue={params.get('pokemon') ?? undefined}
      onSubmit={unstable_retry}
      onRandom={unstable_retry}
    />
  );
}
