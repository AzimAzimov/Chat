"use client";
import React, { FC, useState } from "react";
import Modal from "@/app/components/Modal/Modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import Select from "@/app/components/Select/Select";

interface GroupChatModalProps {
  onClose: () => void;
  isOpen?: boolean;
  users: User[];
}
const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Запрос не выполнен!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"space-y-12"}>
          <div className={"border-b border-gray-900/10 pb-12"}>
            <h2 className={"text-base font-semibold leading-7 text-gray-900"}>
              Групповой чат
            </h2>
            <p className={"text-sm text-gray-600 leading-6 mt-1"}>
              Создайте чат от двух пользователей.
            </p>
            <div className={"mt-10 flex flex-col gap-y-8"}>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                id={"name"}
                label={"Название"}
              />
              <Select
                disabled={isLoading}
                label={"Пользователи"}
                value={members}
                onChange={(value: any) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            </div>
          </div>
          <div className={"mt-6 flex items-center justify-end gap-x-6"}>
            <Button disabled={isLoading} secondary onClick={onClose}>
              Отменить
            </Button>
            <Button disabled={isLoading} type={"submit"}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
