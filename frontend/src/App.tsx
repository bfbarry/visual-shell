import { useEffect, useState } from 'react'
import LsWindow  from './components/LsWindow'
import { LsObject } from './types'

function App() {
  const [ ls, setLs ]  = useState<LsObject[]>([])

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
    <div onContextMenu={(e) => e.preventDefault()}>
      <span className='text-white'>{ls[0].path}</span>

      {ls &&
        <LsWindow ls={ls} setLs={setLs}/>
      }
    </div>
  );
}

export default App;
