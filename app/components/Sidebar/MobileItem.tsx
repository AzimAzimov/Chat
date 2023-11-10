import React, { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
      group flex gap-x-3 text-sm leading-6 w-full font-semibold justify-center
      p-4 text-gray-500 hover:text-black hover:bg-gray-100 transition
    `,
        active && "bg-gray-100 text-black",
      )}
    >
      <Icon className={"h-6 w-6"} />
    </Link>
  );
};
export default MobileItem;
