import { useState } from "react";
import { useLsContext } from "./useLsContext";

export const useGetLs = () => {
  const [error, setError] = useState<boolean|null>(false);
  const [lsIsLoading, setIsLoading] = useState(false);
  const { dispatch } = useLsContext();

  const getLs = async() => {
    setIsLoading(true);
    setError(null);
    const res = await fetch('api/cli/ls')
    const json = await res.json()
    if (res.ok) {
      dispatch({type: 'SET_LS', payload: json});
      setIsLoading(false);
      console.log('ls is set!')
    } else {
      setIsLoading(false);
      setError(json.error); // TODO set this error?
      console.log('err')
    }
  }
  return { getLs, lsIsLoading, error}
}