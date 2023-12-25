import React, { FC, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  other_css: string;
  hideSelf: () => void;
}
export const Modal:FC<ModalProps> = ({ children, other_css, hideSelf }) => {
  const backdrop_css = "bg-black/80 w-full h-screen fixed top-0 left-0 z-[1] flex justify-center"
  let modal_css = `shadow-sm rounded-md bg-white p-4 text-center z-10 mt-[100px] flex flex-col justify-center ${other_css}`
  
  const hideSelfParentClick = (e: React.ChangeEvent<any>) => {
    if (e.target === e.currentTarget) {
      hideSelf()
    }
  }
  
  return (
    <div className={backdrop_css} 
         onClick={hideSelfParentClick}>
      <div className={modal_css}>
        { children }
      </div>
    </div>
  )
}