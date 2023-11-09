"use client";

import React, { FC } from "react";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: FC<DesktopItemProps> = ({
  label,
  href,
  icon,
  onClick,
  active,
}) => {
  return (
    <div>
      <div>{label}</div>
      <div>{href}</div>
      <div>{icon}</div>
    </div>
  );
};

export default DesktopItem;
