import { BookmarksContext } from "../context/BookmarksContext";
import { useContext } from "react";


export const useBookmarksContext = () => {
  const context = useContext( BookmarksContext );

  //check we're in right context
  if (!context) {
    throw Error('BookmarksContext is not being used in its provider')
  }
  return context
}