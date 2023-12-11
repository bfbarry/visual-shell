import { useState } from "react";
import { useBookmarksContext } from "./useBookmarksContext";
import { BookmarkObject} from "../types";


export const useSaveBookmark = () => {
  const [error, setError] = useState<boolean|null>(false);
  const [bookmarksIsLoading, setIsLoading] = useState(false);
  const { dispatch } = useBookmarksContext();

  const saveBookmark = async({ alias, path }: BookmarkObject) => {
    const res_save = await fetch ('api/cli/save_bookmark', {
        method: 'POST',
        body: JSON.stringify({alias, path}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    if (!res_save.ok ) {
        console.log('error with ')
    }
    else {

        setIsLoading(true);
        setError(null);
        const res_get = await fetch('api/cli/get_bookmarks')
        const json = await res_get.json()
        if (res_get.ok) {
          dispatch({type: 'SET_BOOKMARKS', payload: json});
          setIsLoading(false);
          console.log('bookmarks are set!')
        } else {
          setIsLoading(false);
          setError(json.error); // TODO set this error?
          console.log('err')
        }
    }
  }
  return { saveBookmark, bookmarksIsLoading, error}
}