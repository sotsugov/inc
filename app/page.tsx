import { SiteHeader } from '@/components/header';
import UsageTable from '@/components/usage/usage-table';
import { TableSkeleton } from '@/components/usage/usage-table-skeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-12 gap-8 font-[family-name:var(--font-sans)]">
      <SiteHeader />
      <main className="w-full max-w-3xl px-4">
        <div className="w-full flex flex-col gap-8">
          <Suspense fallback={<TableSkeleton />}>
            <UsageTable userId={1} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
