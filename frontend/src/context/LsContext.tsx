import React, { createContext, useReducer, type Dispatch } from "react";
import { LsObject } from "../types";

let init: LsObject[] = [];
export const LsContext = createContext({ls: init, 
										dispatch: (() => undefined) as Dispatch<any>}
									  ); // contains state and dispatch

type contextState = {
	ls: Array<LsObject>;
}
type contextAction = {
	type: string;
	payload: any; //TODO
}

export const lsReducer = (state: contextState, action:contextAction) => {
	switch (action.type) {
		case 'SET_LS':
			localStorage.setItem('ls', JSON.stringify(action.payload));
			return {
				ls: action.payload
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
		ls: []
	});

	return (
		<LsContext.Provider value={{...state, dispatch}}>
			{ children }
		</LsContext.Provider>
	)
}