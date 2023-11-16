"use client";
import React, { FC, useState } from "react";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import {MdOutlineGroupAdd} from 'react-icons/md'
import clsx from "clsx";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems)
  const { conversationId, isOpen } = useConversation()
  const router = useRouter()

  return(
    <aside className={clsx(`
      fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200
    `, isOpen ? 'hidden' : 'block w-full left-0')}>
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Сообщения
          </div>
          <div>
            <MdOutlineGroupAdd/>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default ConversationList;
