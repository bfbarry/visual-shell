import { useLsContext } from "./useLsContext"


export const useCd = () => {
  // TODO error handling
  const { dispatch } = useLsContext();
  const apiUrl = process.env.REACT_APP_API_URL

  const cd = async(txt: string) => {
    const res = await fetch(`${apiUrl}/cli/cd`, {
      method: 'POST',
      body: JSON.stringify({target: txt}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (!res.ok) {
      //set error here
      console.log('error fetch api/cli/cd')
    }
    if (res.ok) {
      //do dispatch
      dispatch({type: 'SET_LS', payload: json})
    }
  };

  return { cd }
}