"use client";
import React, { FC } from "react";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";

interface FormProps {}
const Form: FC<FormProps> = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldDirty: true });
    axios
      .post("/api/messages", {
        ...data,
        conversationId: conversationId,
      })
      .then(() => console.log("Сообщение отправлено!"));
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className={
        "py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full"
      }
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset={"qzxjburi"}
      >
        <HiPhoto
          size={30}
          className={
            "text-sky-500 cursor-pointer hover:text-sky-700 transition"
          }
        />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex items-center lg:gap-4 w-full"}
      >
        <MessageInput
          id={"message"}
          register={register}
          required
          placeholder={"Сообщение..."}
        />
        <button
          type={"submit"}
          className={
            "rounded-full p-2 bg-sky-500 cursor-pointer transition hover:bg-sky-600 rotate-90"
          }
        >
          <HiPaperAirplane size={18} className={"text-white"} />
        </button>
      </form>
    </div>
  );
};
export default Form;
