'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function PokemonUrlSync({ name }: { name: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/?pokemon=${encodeURIComponent(name)}`, { scroll: false });
  }, [name, router]);

  return null;
}
