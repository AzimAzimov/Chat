"use client";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";
import AuthSocialButton from "@/app/components/AuthSocialButton/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type VariantForm = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<VariantForm>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      //axios
    }
    if (variant === "LOGIN") {
      //axios
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full px-2 sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === "REGISTER" && (
            <Input
              id={"name"}
              label="Имя"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id={"email"}
            label={"Почта"}
            type={"email"}
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <Input
            id={"password"}
            label={"Пароль"}
            type={"password"}
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <Button fullWidth={true} disabled={isLoading}>
            {variant === "LOGIN" ? "Войти" : "Регистрация"}
          </Button>
        </form>
        <div className={"mt-6"}>
          <div className={"relative"}>
            <div className={"absolute inset-0 flex items-center"}>
              <div className={"w-full border-t border-gray-200"} />
            </div>
            <div className={"relative flex justify-center text-sm"}>
              <span className={"bg-white px-2 text-gray-500"}>
                Или авторизуйтесь с помощью
              </span>
            </div>
          </div>
          <div className={"flex gap-2 mt-6"}>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className={
            "flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500"
          }
        >
          <div>
            {variant === "LOGIN" ? "Новый пользователь?" : "Уже пользуюсь"}
          </div>
          <div
            onClick={toggleVariant}
            className={"underline cursor-pointer transition hover:text-sky-500"}
          >
            {variant === "LOGIN" ? "Создай аккаунт" : "Войти"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
