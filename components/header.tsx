import Link from 'next/link';
import { ModeToggle } from './theme-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/types/user';

export function SiteHeader({ user }: { user: User }) {
  return (
    <header className="w-full max-w-3xl px-4 pt-3">
      <div className="flex items-center justify-between">
        <Link href="/" rel="noreferrer" className="text-2xl uppercase">
          Increment
        </Link>
        <div className="flex flex-row items-center gap-x-6">
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
      <div className="text-muted-foreground capitalize">
        API credit usage dashboard
      </div>
    </header>
  );
}
