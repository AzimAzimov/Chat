import React from "react";
import Image from "next/image";
import AuthForm from "@/app/(site)/components/AuthForm/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={"/images/logo.png"}
          alt={"Logo"}
          height={48}
          width={48}
          className="mx-auto w-auto"
        />
        <h2 className="text-3xl tracking-tight text-center text-gray-900 mt-6 font-bold">
          Учётная запись
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
