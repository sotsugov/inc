import Link from "next/link";
import { ModeToggle } from "./theme-dropdown";

export function SiteHeader() {
  return (
    <header className="w-full max-w-3xl px-4 pt-3">
      <div className="flex items-center justify-between">
        <Link href="/" rel="noreferrer" className="text-2xl uppercase">
          Increment
        </Link>
        <ModeToggle />
      </div>
      <div className="text-muted-foreground capitalize">
        API credit usage dashboard
      </div>
    </header>
  );
}
