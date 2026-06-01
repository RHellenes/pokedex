'use client';

import Form from 'next/form';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SearchBar({
  defaultValue,
  onSubmit,
  onRandom,
}: {
  defaultValue?: string;
  onSubmit?: () => void;
  onRandom?: () => void;
}) {
  const [value, setValue] = useState(defaultValue ?? '');
  const isValid = value.trim().length > 0;

  useEffect(() => {
    setValue(defaultValue ?? '');
  }, [defaultValue]);

  return (
    <Form
      action=""
      className="flex w-full max-w-md items-stretch gap-2"
      onSubmit={(event) => {
        if (!isValid) {
          event.preventDefault();
          return;
        }
        onSubmit?.();
      }}
    >
      <div className="flex flex-1 items-center border border-zinc-200 bg-white focus-within:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-zinc-100">
        <span
          aria-hidden
          className="select-none pl-3 font-mono text-sm text-zinc-400"
        >
          {'>'}
        </span>
        <input
          type="search"
          name="pokemon"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="search pokemon"
          autoComplete="off"
          className="w-full bg-transparent px-2 py-2 font-mono text-sm tracking-widest text-zinc-900 outline-none placeholder:uppercase placeholder:tracking-widest placeholder:text-zinc-400 dark:text-zinc-100"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="flex shrink-0 items-center whitespace-nowrap border border-zinc-200 bg-white px-3 font-mono text-[10px] uppercase tracking-widest text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-white disabled:text-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 dark:disabled:border-zinc-800 dark:disabled:bg-zinc-950 dark:disabled:text-zinc-700"
      >
        search
      </button>

      <span className="flex shrink-0 items-center font-mono text-[10px] uppercase tracking-widest text-zinc-400">
        or
      </span>

      <Link
        href="/"
        onClick={() => onRandom?.()}
        className="flex shrink-0 items-center whitespace-nowrap border border-zinc-200 bg-white px-3 font-mono text-[10px] uppercase tracking-widest text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
      >
        random
      </Link>
    </Form>
  );
}
