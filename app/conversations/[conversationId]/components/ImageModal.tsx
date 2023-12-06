"use client";

import React, { FC } from "react";
import Modal from "@/app/components/Modal/Modal";
interface ImageModalProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={"w-80 h-80"}>
        <img
          className={"w-full h-full object-cover z-10"}
          src={src}
          alt={"Image"}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
