"use client";
import React, { FC, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal/Modal";
import Input from "@/app/components/Input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/app/components/Button/Button";

interface SettingsModalProps {
  onClose: () => void;
  isOpen?: boolean;
  currentUser: User;
}

const SettingsModal: FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Запрос не выпонен!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"space-y-12"}>
          <div className={"border-b border-gray-900/10 pb-12"}>
            <h2 className={"text-base font-semibold leading-7 text-gray-900"}>
              Профиль
            </h2>
            <p className={"text-sm text-gray-600 leading-6 mt-1"}>
              Редактируйте свои данные
            </p>
            <div className={"mt-10 flex flex-col gap-y-8"}>
              <div>
                <label
                  className={
                    "block text-sm font-medium leading-6 text-gray-900"
                  }
                >
                  Изображение
                </label>
                <div className={"mt-2 flex items-center gap-x-3"}>
                  <div className={"w-20 h-20 relative"}>
                    <img
                      className={
                        "rounded-full bg-center w-full h-full absolute"
                      }
                      src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                      }
                      alt={"Avatar"}
                    />
                  </div>

                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={"qzxjburi"}
                  >
                    <Button disabled={isLoading} secondary type={"button"}>
                      Редактировать
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                id={"name"}
                label={"Имя"}
              />
            </div>
          </div>
          <div className={"mt-6 flex items-center justify-end gap-x-6"}>
            <Button disabled={isLoading} secondary onClick={onClose}>
              Отменить
            </Button>{" "}
            <Button disabled={isLoading} type={"submit"}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
