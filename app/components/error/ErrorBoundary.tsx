'use client';

import type { ReactNode } from 'react';
import { unstable_catchError, type ErrorInfo } from 'next/error';
import { ErrorState } from '@/app/components/error/ErrorState';
import type { Resolution } from '@/app/lib/types';

type FallbackProps = {
  title?: ReactNode;
  description?: ReactNode;
  resolution: Resolution;
};

function Fallback(props: FallbackProps, errorInfo: ErrorInfo) {
  const Resolution = props.resolution;
  return (
    <ErrorState
      title={props.title ?? 'Something went wrong'}
      description={props.description}
    >
      <Resolution {...errorInfo} />
    </ErrorState>
  );
}

export const ErrorBoundary = unstable_catchError(Fallback);
