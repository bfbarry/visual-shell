import { LsContext } from "../context/LsContext";
import { useContext } from "react";


export const useLsContext = () => {
    const context = useContext( LsContext );

    //check we're in right context
    if (!context) {
        throw Error('LsContext is not beinbg used in its provider')
    }
    return context
}