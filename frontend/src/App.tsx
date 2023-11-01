import { FC, useEffect, useState } from 'react'
import LsWindow  from './components/LsWindow'
import CommandLine from './components/CommandLine'
import { LsObject } from './types'

const App:FC = () => {
  const [ ls, setLs ]  = useState<LsObject[]>([])
  const [ terminalText, setTerminalText] = useState('')

  useEffect(() => {
    const fetchCLI = async () => {
      const res = await fetch('api/cli/ls')
      const json = await res.json()
      if (res.ok) {
        setLs(json)
      }
    }
    fetchCLI()
    // console.log(ls)
  }, [setLs])
  
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      {ls.length &&
      <>
        <span className='text-white'>{ls[0].path}</span>
        <LsWindow ls={ls} setLs={setLs}/>
      </>
      }
      <CommandLine text={terminalText} setText={setTerminalText}/>
    </div>
  );
}

export default App;
