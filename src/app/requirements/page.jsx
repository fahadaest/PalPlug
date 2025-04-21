'use client';
import React, { Suspense } from 'react';
import QueryParamsWrapper from './QueryParamsWrapper';
export default function RequirementsPage() {
  return (
    <Suspense fallback={<div>Loading parameters…</div>}>
      <QueryParamsWrapper />
    </Suspense>
  );
}
