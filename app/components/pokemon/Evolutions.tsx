import Link from 'next/link';
import { Fragment } from 'react';
import { getEvolutionChain } from '@/app/lib/pokemon';
import type { EvolutionLink } from '@/app/lib/types';

const ARTWORK_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const artworkUrl = (id: number) => `${ARTWORK_BASE}/${id}.png`;

function EvoChip({ evo, active }: { evo: EvolutionLink; active: boolean }) {
  const body = (
    <span
      className={`flex w-24 flex-col items-center gap-1 border p-2 ${
        active
          ? 'border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-950'
          : 'border-zinc-200 dark:border-zinc-800'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artworkUrl(evo.id)}
        alt={evo.name}
        width={64}
        height={64}
        className="size-16 object-contain"
      />
      <span className="truncate text-[10px] uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
        {evo.name}
      </span>
    </span>
  );

  if (active) return body;

  return (
    <Link
      href={`/?pokemon=${encodeURIComponent(evo.name)}`}
      className="transition-opacity hover:opacity-60"
    >
      {body}
    </Link>
  );
}

export async function Evolutions({
  speciesUrl,
  currentName,
}: {
  speciesUrl: string;
  currentName: string;
}) {
  const chain = await getEvolutionChain(speciesUrl);

  if (chain.length <= 1) return null;

  return (
    <section className="w-full border border-zinc-200 font-mono dark:border-zinc-800">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          Evolution
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 p-6">
        {chain.map((evo, i) => (
          <Fragment key={`${evo.name}-${i}`}>
            {i > 0 && (
              <span aria-hidden className="text-zinc-400">
                &rarr;
              </span>
            )}
            <EvoChip evo={evo} active={evo.name === currentName} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
