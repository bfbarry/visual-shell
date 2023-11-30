import { useState } from "react";
import { useLsContext } from "./useLsContext";

export const useGetLs = () => {
  const [error, setError] = useState<boolean|null>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useLsContext();

  const getLs = async() => {
    setIsLoading(true);
    setError(null);
    const res = await fetch('api/cli/ls')
    const json = await res.json()
    if (res.ok) {
      dispatch({type: 'SET_LS', payload: json});
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(json.error); // TODO set this error?
    }
  }
  return { getLs, isLoading, error}
}