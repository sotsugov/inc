import { SiteHeader } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-12 gap-8 font-[family-name:var(--font-sans)]">
      <SiteHeader />
    </div>
  );
}
