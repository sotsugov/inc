"use client";
import { useState } from "react";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { SiteHeader } from "@/components/header";
import UsageDashboard from "@/components/dashboard";
import { UserSelect } from "@/components/user-select";
import { Suspense } from "react";
import { User } from "@/types/user";

const users: User[] = [
  {
    id: 1,
    username: "Jane Doe",
    avatar: "https://github.com/sotsugov.png",
  },
  {
    id: 2,
    username: "Johan Doeson",
    avatar: "https://github.com/sotsugov.png",
  },
  {
    id: 3,
    username: "Johanna Doedottir",
    avatar: "https://github.com/sotsugov.png",
  },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  const handleUserChange = (userId: string) => {
    const user = users.find((u) => u.id.toString() === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-12 gap-8 font-[family-name:var(--font-sans)]">
      <SiteHeader />
      <div className="w-full max-w-3xl px-4">
        <UserSelect
          users={users}
          selectedUser={selectedUser}
          onUserChange={handleUserChange}
        />
      </div>
      <main className="w-full max-w-3xl px-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <UsageDashboard userId={selectedUser.id} />
        </Suspense>
      </main>
    </div>
  );
}
