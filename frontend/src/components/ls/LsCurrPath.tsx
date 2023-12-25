import { useLsContext } from "../../hooks/useLsContext";
import { useBookmarksContext } from "../../hooks/useBookmarksContext";
import { useSaveBookmark } from "../../hooks/useSaveBookmark";
import { FC, useState } from "react";
import { ReactComponent as BookmarkIcon} from '../../assets/svg/bookmark-svgrepo-com.svg';
import { AddBookmarkPrompt } from "./AddBookmarkPrompt";


interface LsCurrPathProps {
    currPath: string;
    setCurrPath: (e: string) => void;
  }
export const LsCurrPath:FC<LsCurrPathProps> = ({currPath, setCurrPath}) => {
  const { dispatch } = useLsContext();
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);

  const cd_enter = async(txt: string) => {
    const res = await fetch('api/cli/cd', {
      method: 'POST',
      body: JSON.stringify({target: txt}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (!res.ok) {
      //set error here
      console.log('error fetch api/cli/cd')
    }
    if (res.ok) {
      //do dispatch
      dispatch({type: 'SET_LS', payload: json})
    }
  };

  const bookmarkClick = () => {
    setShowBookmarkPrompt(!showBookmarkPrompt)
  } 

  return (
    <div>
      <form className="flex inline-flex justify-center"
      onSubmit={(e) => {
                            e.preventDefault();
                            cd_enter(currPath)}}>
        <input className='bg-[black] text-white caret-white w-[500px]' 
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