import Link from 'next/link';
import { ModeToggle } from './theme-dropdown';

export function SiteHeader() {
  return (
    <header className="w-full max-w-3xl px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" rel="noreferrer" className="text-2xl uppercase">
          Increment
        </Link>
        <div className="flex flex-row items-center gap-x-6">
          <ModeToggle />
        </div>
      </div>
      <div className="text-muted-foreground capitalize">
        API credit usage dashboard
      </div>
    </header>
  );
}
