import React, { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  return (
    <Sidebar>
      <div className={"h-full"}>{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
