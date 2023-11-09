"use client";
import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  danger,
  disabled,
  fullWidth,
  type,
  onClick,
  secondary,
}) => {
  return (
    <button
      className={clsx(
        ` flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "transition bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
