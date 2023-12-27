import { useSetBookmarks } from "../../hooks/useSetBookmarks";
import { FC, useEffect } from "react";
import { useBookmarksContext } from "../../hooks/useBookmarksContext";


export const BookmarkTab:FC = () => {
  const { setBookmarks } = useSetBookmarks();
  const { bookmarks, dispatch } = useBookmarksContext();


  useEffect(() => {
    setBookmarks()
  }, [])

  return (
    <div className="float-right bg-[#242424]">
      <ol>
      {bookmarks.length &&
        bookmarks.map((bookmark, ix) => {
          console.log('bookmark tab loaded an item')
          return (
            <li key={bookmark.alias}
            className="text-slate-100">{bookmark.alias}</li>
          )
        })
      }
      </ol>
    </div>
  )
}