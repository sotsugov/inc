import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/types/user';
import React from 'react';

interface UserSelectProps {
  users: User[];
  selectedUser: User;
  onUserChange: (userId: string) => void;
}

const UserAvatar = React.memo(({ user }: { user: User }) => (
  <Avatar className="size-6">
    <AvatarImage src={user.avatar} alt={user.username} />
    <AvatarFallback>{user.username}</AvatarFallback>
  </Avatar>
));

UserAvatar.displayName = 'Avatar';

export function UserSelect({
  users,
  selectedUser,
  onUserChange,
}: UserSelectProps) {
  return (
    <Select
      onValueChange={onUserChange}
      defaultValue={selectedUser.id.toString()}
    >
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Select a user" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id.toString()}>
            <div className="flex items-center gap-2">
              <UserAvatar user={user} />
              <span>{user.username}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
