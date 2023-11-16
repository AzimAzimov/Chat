import React, { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList/UserList";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList items={users} />
      <div className={"h-full"}>{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
