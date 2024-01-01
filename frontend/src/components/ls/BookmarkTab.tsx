import { FC, useEffect, useState } from "react";
import { useSetBookmarks } from "../../hooks/useSetBookmarks";
import { useBookmarksContext } from "../../hooks/useBookmarksContext";
import { useCd } from "../../hooks/useCd";
import '../../css/ls.css';
import { BookmarkMenu } from "../contextMenus/BookmarkMenu";


export const BookmarkTab:FC = () => {
  const { setBookmarks } = useSetBookmarks();
  const { bookmarks, dispatch } = useBookmarksContext();
  const { cd } = useCd();
  const [ menuPosition, setMenuPosition] = useState({x:0, y:0});
  const [ showMenu, setShowMenu ] = useState(false);
  const [ currMenuAlias, setCurrMenuAlias ] = useState('');

  useEffect(() => {
    setBookmarks()
  }, [])

  const onClick = (e: React.ChangeEvent<any>, path: string) => {
    e.preventDefault();
    cd(path);
  }

  const deleteBookmark = async() => {
    const res = await fetch('api/cli/delete_bookmark', {
      method: 'DELETE',
      body: JSON.stringify({ alias: currMenuAlias }),
      headers: { 'Content-Type': 'application/json'}
    })
    if (!res.ok) {
      // TODO
      console.log('Error deleting bookmark in context menu')
    }
    else {
      dispatch({type: 'DELETE_BOOKMARK', payload: { alias: currMenuAlias }})
    }

  }

  const onBookmarkMenu = async(e: React.MouseEvent<any>, alias:string) => {
    e.preventDefault();
    setMenuPosition({x: e.clientX, y: e.clientY});
    setCurrMenuAlias(alias);
    setShowMenu(true);
  }

  // TODO this is rendering too much
  return (
    <div className="rounded-md bg-[#242424] w-[100px] overflow-auto mt-[29px] mb-1">
      <ol>
      {bookmarks.length ?
        bookmarks.map((bookmark, ix) => {
          console.log('bookmark tab loaded an item')
          return (
            <li key={bookmark.alias} onContextMenu={(e) => onBookmarkMenu(e, bookmark.alias)}>
              <button className="bookmarks-tab"
              onClick={(e) => onClick(e, bookmark.path)}>
                {bookmark.alias}
              </button>
            </li>
          )
        })
        : 
        <div/>
      }
      </ol>
      {showMenu &&
        <BookmarkMenu 
          position={menuPosition} 
          deleteBookmark={deleteBookmark} 
          hideSelf={() => setShowMenu(false)}
        />
      }
    </div>
  )
}