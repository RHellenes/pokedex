import type { ComponentType } from 'react';
import type { ErrorInfo } from 'next/error';

export type Resolution = ComponentType<ErrorInfo>;

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedResource;
}

export interface PokemonAbility {
  ability: NamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  species: NamedResource;
}

export interface EvolutionLink {
  name: string;
  id: number;
}
