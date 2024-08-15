import { FC, useState } from "react";
import { ReactComponent as BookmarkIcon } from '../../assets/svg/bookmark-svgrepo-com.svg';
import { AddBookmarkPrompt } from "./AddBookmarkPrompt";
import { useCd } from "../../hooks/useCd";


interface LsCurrPathProps {
    currPath: string;
    setCurrPath: (e: string) => void;
  }
export const LsCurrPath:FC<LsCurrPathProps> = ({currPath, setCurrPath}) => {
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);
  const { cd } = useCd();

  const bookmarkClick = () => {
    setShowBookmarkPrompt(!showBookmarkPrompt)
  } 

  return (
    <div className="flex flex-row align-center">
      <form className="flex inline-flex justify-center"
      onSubmit={(e) => {
                            e.preventDefault();
                            cd(currPath)}}>
        <input className='bg-indigo-950 text-white caret-white w-[775px]' 
              type="text"
              value={currPath} 
              onChange={e => setCurrPath(e.target.value)}/>
      </form>
      <button className="flex inline-flex justify-center" onClick={bookmarkClick}>
          <BookmarkIcon className="fill-zinc-100 w-[25px] h-auto"/>
      </button>
      {
        showBookmarkPrompt &&
          <AddBookmarkPrompt currPath={ currPath } hideForm={() => setShowBookmarkPrompt(false)}/>
      }
    </div>
  )
}