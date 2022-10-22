import { useEffect, useState } from 'react'
import LsWindow  from './components/LsWindow'

function App() {
  const [ ls, setLs ]  = useState(null)

  useEffect(() => {
    const fetchCLI = async () => {
      const res = await fetch('api/cli/ls')
      const json = await res.json()
      if (res.ok) {
        setLs(json)
      }
    }
    fetchCLI()
  }, [setLs])

  return (
    <div>
      {ls &&
        <LsWindow ls={ls} setLs={setLs}/>
      }
    </div>
  );
}

export default App;
