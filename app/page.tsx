import DashboardSkeleton from '@/components/dashboard-skeleton';
import { SiteHeader } from '@/components/header';
import UsageDashboard from '@/components/dashboard';
import { Suspense } from 'react';

export default function Home() {
  const user = {
    id: 1,
    username: 'IS',
    avatar: 'https://github.com/sotsugov.png',
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-12 gap-8 font-[family-name:var(--font-sans)]">
      <SiteHeader user={user} />
      <main className="w-full max-w-3xl px-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <UsageDashboard userId={user.id} />
        </Suspense>
      </main>
    </div>
  );
}
