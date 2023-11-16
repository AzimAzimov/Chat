import { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "../actions/getConversations";
export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations()

  return (
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className={"h-full"}>{children}</div>
    </Sidebar>
  );
}
