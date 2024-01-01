import React, { FC, useState } from "react";
import { Backdrop } from "./Backdrop";


interface ModalProps {
  children: React.ReactNode;
  other_css: string;
  hideSelf: () => void;
}
export const Modal:FC<ModalProps> = ({ children, other_css, hideSelf }) => {
  let modal_css = `shadow-sm rounded-md bg-white p-4 text-center z-10 mt-[100px] flex flex-col justify-center ${other_css}`
  
  return (
    <Backdrop hideSelf={hideSelf} menuType="MODAL">
      <div className={modal_css}>
        { children }
      </div>
    </Backdrop>

  )
}