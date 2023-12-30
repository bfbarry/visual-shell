import { useSetBookmarks } from "../../hooks/useSetBookmarks";
import { FC, useEffect } from "react";
import { useBookmarksContext } from "../../hooks/useBookmarksContext";
import { useCd } from "../../hooks/useCd";


export const BookmarkTab:FC = () => {
  const { setBookmarks } = useSetBookmarks();
  const { bookmarks } = useBookmarksContext();
  const { cd } = useCd();
  const bookmarkStyle = {
    background: 'linear-gradient(to bottom, #bda126, #bfb06b)',
    width: '100px'
  }

  useEffect(() => {
    setBookmarks()
  }, [])

  const changeDir = (e: React.ChangeEvent<any>, path: string) => {
    e.preventDefault();
    cd(path);
  }

  return (
    <div className="rounded-md bg-[#242424] w-[100px] overflow-auto mt-[29px] mb-1">
      <ol>
      {bookmarks.length &&
        bookmarks.map((bookmark, ix) => {
          console.log('bookmark tab loaded an item')
          return (
            <li key={bookmark.alias}>
              <button style={bookmarkStyle}
              onClick={(e) => changeDir(e, bookmark.path)}>
                {bookmark.alias}
              </button>
            </li>
          )
        })
      }
      </ol>
    </div>
  )
}