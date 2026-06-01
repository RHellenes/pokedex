import type { ErrorInfo } from 'next/error';

export function RetryResolution({ unstable_retry }: ErrorInfo) {
  return (
    <button
      type="button"
      onClick={() => unstable_retry()}
      className="border border-zinc-900 bg-zinc-950 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80 dark:border-zinc-100 dark:bg-zinc-50 dark:text-zinc-950"
    >
      Try again
    </button>
  );
}
