import { FC, useState } from "react";
import { Modal } from "../common/Modal";
import {ReactComponent as DownPointer } from '../../assets/svg/down-arrow-5-svgrepo-com.svg';

interface AddBookmarkPromptProps {
  currPath: string;
  hideForm: () => void;
}
export const AddBookmarkPrompt:FC<AddBookmarkPromptProps> = ({ currPath, hideForm }) => {

  const [ bookmarkPath, setBookmarkPath ] = useState(currPath);
  const [ bookmarkName, setBookmarkName ] = useState('');
  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    hideForm();

  }
  const inputCss = 'rounded border-[1px] border-black';
  return (
    <Modal other_css='w-[300px] h-[150px]' hideSelf={hideForm}>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <input onChange={(e) => {
            e.preventDefault();
            setBookmarkName(e.target.value);
          }}
          className={inputCss}
          value={ bookmarkName }/>
        <DownPointer className="block m-auto stroke-black w-[25px] h-auto"/>
        <input onChange={(e) => {
            e.preventDefault();
            setBookmarkPath(e.target.value);
          }}
        className={inputCss}
        value={ bookmarkPath }/>
        <button className="bg-amber-300">add bookmark</button>
      </form>
    </Modal>
  )
}