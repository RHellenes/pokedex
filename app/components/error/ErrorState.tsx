import type { ReactNode } from 'react';

export function ErrorState({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 font-mono dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-4 border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-black">
        <h1 className="text-xl uppercase tracking-widest text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        {description ? (
          <p className="max-w-prose text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
        {children ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {children}
          </div>
        ) : null}
      </main>
    </div>
  );
}
