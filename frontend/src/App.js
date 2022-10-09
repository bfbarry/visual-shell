import { useEffect, useState } from 'react'
import LsWindow  from './components/LsWindow'

function App() {
  const [ text, setText ]  = useState(null)

  useEffect(() => {
    const fetchCLI = async () => {
      const res = await fetch('api/cli/ls')
      const json = await res.json()
      // console.log(json)
      // console.log(res.ok)
      if (res.ok) {
        setText(json.stdout)
      }
    }
    fetchCLI()
  }, [setText])

  return (
    <div>
      {text &&
        <LsWindow ls_list={text}/>
      }
    </div>
  );
}

export default App;
