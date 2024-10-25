import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types/user";

interface UserSelectProps {
  users: User[];
  selectedUser: User;
  onUserChange: (userId: string) => void;
}

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
              <Avatar className="size-6">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <span>{user.username}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
