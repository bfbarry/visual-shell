import React, { createContext, useReducer, type Dispatch } from "react";
import { LsObject } from "../types";

export const LsContext = createContext({lsitems: [], 
										dispatch: (() => undefined) as Dispatch<any>}
									  ); // contains state and dispatch

type contextState = {
	lsitems: Array<LsObject>;
}
type contextAction = {
	type: string;
	payload: any; //TODO
}

export const lsReducer = (state: contextState, action:contextAction) => {
	switch (action.type) {
		case 'SET_LS':
			return {
				lsitems: action.payload
			}
		default:
			return state
	}
}

type LsContextProviderProps = {
	children: React.ReactNode;
}
export const LsContextProvider = ({ children }: LsContextProviderProps) => {
	const [state, dispatch] = useReducer(lsReducer, {
		lsitems: null
	});

	return (
		<LsContext.Provider value={{...state, dispatch}}>
			{ children }
		</LsContext.Provider>
	)
}