import { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "@/app/actions/getUsers";
export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <ConversationList users={users} initialItems={conversations} />
      <div className={"h-full"}>{children}</div>
    </Sidebar>
  );
}
