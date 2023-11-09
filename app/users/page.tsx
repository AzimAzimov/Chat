import { useRouter } from "next/navigation";
import EmptyState from "@/app/components/EmptyState/EmptyState";

const Users = () => {
  return (
    <div className={"hidden lg:block lg:pl-80 h-full"}>
      <EmptyState />
    </div>
  );
};

export default Users;
