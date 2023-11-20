"use client";
import React, { FC, useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "@/app/components/Avatar/Avatar";
import mobileFooter from "@/app/components/Sidebar/MobileFooter";
import { HiEllipsisHorizontal, HiEllipsisVertical } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} участники`;
    }
    return "В сети";
  }, [conversation]);

  return (
    <div
      className={
        "bg-white w-full flex justify-between items-center border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 shadow-sm"
      }
    >
      <div className={"flex gap-3 items-center"}>
        <Link
          href={"/conversations"}
          className={
            "lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          }
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className={"flex flex-col"}>
          <div className={""}>{conversation.name || otherUser.name}</div>
          <div className={"text-sm font-light text-neutral-500"}>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisVertical
        className={
          "font-medium text-sky-500 transition hover:text-sky-600 cursor-pointer"
        }
        size={32}
        onClick={() => {}}
      />
    </div>
  );
};
export default Header;
