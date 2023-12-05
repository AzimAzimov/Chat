"use client";
import React, { FC, useState } from "react";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "@/app/components/Sidebar/DesktopItem";
import { User } from "@prisma/client";
import Avatar from "@/app/components/Avatar/Avatar";
import { flagSymbol } from "arg";
import SettingsModal from "@/app/components/Sidebar/SettingsModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <div
        className={
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between"
        }
      >
        <nav className={" mt-4 flex flex-col justify-between"}>
          <ul role={"list"} className={"flex flex-col items-center space-y-1"}>
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                onClick={item.onClick}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
        <nav className={"mt-4 flex flex-col justify-between items-center"}>
          <div
            onClick={() => setIsOpen(true)}
            className={"cursor-pointer transition hover:opacity-75"}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
