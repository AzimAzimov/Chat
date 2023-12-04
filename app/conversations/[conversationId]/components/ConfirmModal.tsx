"use client";
import React, { FC, ReactNode, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useConversation();
  const router = useRouter();

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        if (onClose) {
          onClose();
        }
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Успешно!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);

  return <div>ConfirmModal</div>;
};

export default ConfirmModal;
