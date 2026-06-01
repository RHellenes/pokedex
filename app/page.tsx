import { Suspense } from 'react';
import { ErrorBoundary } from '@/app/components/error/ErrorBoundary';
import { SearchResolution } from '@/app/components/error/resolutions/SearchResolution';
import { Profile } from '@/app/components/pokemon/Profile';
import { SearchBar } from '@/app/components/pokemon/SearchBar';
import type { SearchParams } from '@/app/lib/types';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { pokemon } = await searchParams;
  const queried = Array.isArray(pokemon) ? pokemon[0] : pokemon;

  return (
    <ErrorBoundary
      title="Could not load this Pokemon"
      description="Something went wrong while fetching this Pokemon."
      resolution={SearchResolution}
    >
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-stretch gap-6 py-16 px-16 bg-white dark:bg-black">
          <SearchBar defaultValue={queried} />
          <Suspense>
            <Profile searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
