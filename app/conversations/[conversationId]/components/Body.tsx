"use client";
import React, { FC } from "react";
import { Message } from "@prisma/client";

interface BodyProps {
  initialMessages: Message[];
}
const Body: FC<BodyProps> = () => {
  return (
    <div className={"flex-1 overflow-y-auto"}>
      <div>ewewe</div>
    </div>
  );
};
export default Body;
