import React, { FC } from "react"

interface BackdropProps {
  children: React.ReactNode;
  hideSelf: () => void;
  menuType: string;
}
export const Backdrop:FC<BackdropProps> = ({ children, hideSelf, menuType }) => {
  let css: React.CSSProperties = {};
  switch (menuType) {
    case 'CONTEXT_MENU':
      css = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      };
      break;
    case 'MODAL':
      css = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
      break;
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