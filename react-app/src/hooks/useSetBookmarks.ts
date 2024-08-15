import { useState } from "react";
import { useBookmarksContext } from "./useBookmarksContext";
import { BookmarkObject} from "../types";


export const useSetBookmarks = () => {
  const [error, setError] = useState<boolean|null>(false);
  const [bookmarksIsLoading, setIsLoading] = useState(false);
  const { dispatch } = useBookmarksContext();
  const apiUrl = process.env.REACT_APP_API_URL

  const setBookmarks = async() => {
    setIsLoading(true);
    setError(null);
    const res_get = await fetch(`${apiUrl}/cli/get_bookmarks`)
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
  return { setBookmarks, bookmarksIsLoading, error}
}