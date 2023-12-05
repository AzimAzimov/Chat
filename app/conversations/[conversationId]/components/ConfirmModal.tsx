"use client";
import React, { FC, ReactNode, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/Button/Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={"sm:flex sm:items-start"}>
        <div
          className={
            "mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 justify-center"
          }
        >
          <FiAlertTriangle className={"h-5 w-5 text-red-600"} />
        </div>
        <div className={"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"}>
          <Dialog.Title
            as={"h3"}
            className={"text-base font-semibold leading-6 text-gray-900"}
          >
            Удалить пользователя
          </Dialog.Title>
          <div className={"mt-2"}>
            <p className={"text-gray-500 text-sm"}>
              Вы действительно хотите удалить пользователя? После удаления
              невозможно восстановить аккаунт.
            </p>
          </div>
        </div>
      </div>
      <div className={"mt-5 sm:mt-4 sm:flex sm:flex-row-reverse flex gap-2"}>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Удалить
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
