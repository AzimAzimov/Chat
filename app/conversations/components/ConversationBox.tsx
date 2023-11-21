"use client";
import React, { FC, useCallback, useMemo } from "react";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar/Avatar";
interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const lastMessages = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessages) return false;
    const seenArray = lastMessages.seen || [];
    if (!userEmail) return false;
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessages]);

  const lastMessageText = useMemo(() => {
    if (lastMessages?.image) return "Sent an image";
    if (lastMessages?.body) return lastMessages.body;
    return "Started a conversation";
  }, [lastMessages]);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full relative flex items-center space-x-3 rounded-lg transition cursor-pointer hover:bg-neutral-100 p-3 mb-1
    `,
        selected ? "bg-neutral-300" : "bg-white",
      )}
    >
      <Avatar user={otherUser} />
      <div className={"min-w-0 flex-1"}>
        <div className={"focus:outline-none"}>
          <div className={"flex justify-between items-center mb-1"}>
            <p className={"text-md font-medium text-gray-900"}>
              {data.name || otherUser.name}
            </p>
            {lastMessages?.createdAt && (
              <p className={"text-xs text-gray-400 font-light"}>
                {format(new Date(lastMessages.createdAt), "H:MM")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium",
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
