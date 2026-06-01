import 'server-only';
import { cacheLife } from 'next/cache';
import type { EvolutionLink, Pokemon } from '@/app/lib/types';

interface EvolutionChainNode {
  species: { name: string; url: string };
  evolves_to: EvolutionChainNode[];
}

function idFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

function flattenChain(node: EvolutionChainNode): EvolutionLink[] {
  const current: EvolutionLink = {
    name: node.species.name,
    id: idFromUrl(node.species.url),
  };
  return [current, ...node.evolves_to.flatMap(flattenChain)];
}

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonList(): Promise<string[]> {
  'use cache';
  cacheLife('days');
  const res = await fetch(`${POKEAPI_BASE}?limit=100000&offset=0`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon list (${res.status})`);
  const data = await res.json();
  return data.results.map((r: { name: string }) => r.name);
}

export async function getRandomPokemonName(): Promise<string> {
  const list = await getPokemonList();
  return list[Math.floor(Math.random() * list.length)];
}

export async function getPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKEAPI_BASE}/${encodeURIComponent(name)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon "${name}" (${response.status})`);
  }

  return response.json();
}

export async function getEvolutionChain(
  speciesUrl: string,
): Promise<EvolutionLink[]> {
  'use cache';
  cacheLife('days');

  const speciesRes = await fetch(speciesUrl);
  if (!speciesRes.ok) return [];
  const species = await speciesRes.json();

  const chainUrl: string | undefined = species.evolution_chain?.url;
  if (!chainUrl) return [];

  const chainRes = await fetch(chainUrl);
  if (!chainRes.ok) return [];
  const data = await chainRes.json();

  return flattenChain(data.chain);
}
