import { FC, useRef } from "react";
import { Backdrop } from "../common/Backdrop";
import { H5Handler } from "./H5Handler";

interface HandlerProps {
  handlerName: string;
  data: any;
  hideSelf: () => void;
}
export const Handler:FC<HandlerProps> = ({ handlerName, data, hideSelf }) => {
  let HandlerComponent = null;
  switch (handlerName) {
    case 'default_handler_h5':
      HandlerComponent = H5Handler;
      break;
  }
  return (
    <Backdrop hideSelf={hideSelf} menuType='MODAL'>
      {HandlerComponent ? 
      <HandlerComponent data={data}/> : null}
    </Backdrop>
  )
}