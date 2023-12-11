import React, { createContext, useReducer, type Dispatch } from "react";
import { BookmarkObject } from "../types";

let init: BookmarkObject[] = [];
export const BookmarksContext = createContext({bookmarks: init, 
										dispatch: (() => undefined) as Dispatch<any>}
									  ); // contains state and dispatch

type contextState = {
	bookmarks: Array<BookmarkObject>;
}
type contextAction = {
	type: string;
	payload: any; //TODO
}

export const bookmarksReducer = (state: contextState, action:contextAction) => {
	switch (action.type) {
        case 'SET_BOOKMARKS':
            return {
				bookmarks: action.payload
			}
        case 'DELETE_BOOKMARK':
            return {
                bookmarks: state.bookmarks.filter((b) => b.alias != action.payload.id)
            }
		default:
			return state
	}
}

type BookmarksContextProviderProps = {
	children: React.ReactNode;
}
export const BookmarksContextProvider = ({ children }: BookmarksContextProviderProps) => {
	const [state, dispatch] = useReducer(bookmarksReducer, {
		bookmarks: []
	});

	return (
		<BookmarksContext.Provider value={{...state, dispatch}}>
			{ children }
		</BookmarksContext.Provider>
	)
}