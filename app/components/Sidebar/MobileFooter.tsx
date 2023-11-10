"use client";
import React from "react";
import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "@/app/components/Sidebar/MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className={
        "flex justify-between w-full bottom-0 z-40 fixed items-center bg-white border-t-gray-100 border-t-[1px] lg:hidden"
      }
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
          label={route.label}
        />
      ))}
    </div>
  );
};
export default MobileFooter;
