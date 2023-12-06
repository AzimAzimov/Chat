"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();
  const bottomRef = useRef(null);

  useEffect(() => {
    axios
      .post(`/api/conversations/${conversationId}/seen`)
      .finally(() => console.log(""));
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className={"flex-1 overflow-y-auto"}>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={index}
          data={message}
        />
      ))}
      <div ref={bottomRef} className={"pt-24"} />
    </div>
  );
};
export default Body;
