"use client";
import React, { FC } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}
const Avatar: FC<AvatarProps> = ({ user }) => {
  return (
    <div className={"relative"}>
      <div
        className={
          "relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11"
        }
      >
        <img
          src={user?.image || "/images/placeholder.jpg"}
          alt={"Avatar"}
          className={"rounded-full bg-cover w-full h-full absolute"}
        />
        {/*<Image*/}
        {/*  fill*/}
        {/*  src={user?.image || "/images/placeholder.jpg"}*/}
        {/*  alt={"Avatar"}*/}
        {/*/> */}
      </div>
      <span
        className={
          "absolute block rounded-full bg-green-500 h-2 md:h-3 md:w-3 w-2 right-0 top-0 ring-2 ring-white"
        }
      />
    </div>
  );
};
export default Avatar;
