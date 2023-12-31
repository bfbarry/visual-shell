import React, { FC } from "react"

interface BlankBackdropProps {
  children: React.ReactNode;
  hideSelf: () => void;
}
export const BlankBackdrop:FC<BlankBackdropProps> = ({ children, hideSelf }) => {
  const css: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',

  }
  const hideSelfParentClick = (e: React.ChangeEvent<any>) => {
    if (e.target === e.currentTarget) {
      hideSelf();
    }
  }
  return (
    <div 
      style={css} 
      onClick={hideSelfParentClick}>
      { children }
    </div>
  )
}