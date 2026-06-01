import { Suspense } from 'react';
import { getPokemon, getRandomPokemonName } from '@/app/lib/pokemon';
import { PokemonUrlSync } from '@/app/components/pokemon/PokemonUrlSync';
import { Evolutions } from '@/app/components/pokemon/Evolutions';
import type { Pokemon, SearchParams } from '@/app/lib/types';

const MAX_STAT = 255;

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-zinc-500">
      {children}
    </span>
  );
}

function TypeChip({ name }: { name: string }) {
  return (
    <span className="border border-zinc-300 px-2 py-1 text-[10px] uppercase tracking-widest text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
      {name}
    </span>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, Math.round((value / MAX_STAT) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-[10px] uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span className="w-8 shrink-0 text-right text-xs tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
      <span className="h-1 flex-1 bg-zinc-200 dark:bg-zinc-800">
        <span
          className="block h-full bg-zinc-900 dark:bg-zinc-100"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <Label>{label}</Label>
      <span className="text-sm text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const artwork =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default;
  const dexNumber = `#${String(pokemon.id).padStart(4, '0')}`;
  const heightMeters = (pokemon.height / 10).toFixed(1);
  const weightKilos = (pokemon.weight / 10).toFixed(1);

  return (
    <article className="w-full border border-zinc-200 font-mono dark:border-zinc-800">
      <header className="flex flex-col gap-6 border-b border-zinc-200 p-6 dark:border-zinc-800 sm:flex-row sm:items-center">
        <div className="flex size-32 shrink-0 items-center justify-center border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
          {artwork ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artwork}
              alt={pokemon.name}
              width={128}
              height={128}
              className="size-full object-contain"
            />
          ) : (
            <Label>no image</Label>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label>{dexNumber}</Label>
          <h1 className="text-2xl uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
            {pokemon.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <TypeChip key={t.type.name} name={t.type.name} />
            ))}
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <Label>Base Stats</Label>
        <div className="flex flex-col gap-2">
          {pokemon.stats.map((s) => (
            <StatBar
              key={s.stat.name}
              label={STAT_LABELS[s.stat.name] ?? s.stat.name}
              value={s.base_stat}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 divide-x divide-y divide-zinc-200 dark:divide-zinc-800 sm:grid-cols-4 sm:divide-y-0">
        <MetaCell label="Height" value={`${heightMeters} m`} />
        <MetaCell label="Weight" value={`${weightKilos} kg`} />
        <MetaCell label="Base XP" value={pokemon.base_experience} />
        <MetaCell
          label="Abilities"
          value={
            <span className="flex flex-col gap-0.5">
              {pokemon.abilities.map((a) => (
                <span key={a.ability.name}>
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="text-zinc-500"> (hidden)</span>
                  )}
                </span>
              ))}
            </span>
          }
        />
      </section>
    </article>
  );
}

export async function Profile({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { pokemon } = await searchParams;
  const raw = Array.isArray(pokemon) ? pokemon[0] : pokemon;
  const queried = raw?.trim() ? raw.trim() : undefined;
  const name = queried ?? (await getRandomPokemonName());

  const pokemonData = await getPokemon(name);

  return (
    <>
      {!queried && <PokemonUrlSync name={name} />}
      <div className="flex w-full flex-col gap-4">
        <PokemonCard pokemon={pokemonData} />
        <Suspense fallback={null}>
          <Evolutions
            speciesUrl={pokemonData.species.url}
            currentName={pokemonData.name}
          />
        </Suspense>
      </div>
    </>
  );
}
