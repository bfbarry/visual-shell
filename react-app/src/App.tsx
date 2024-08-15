import { FC, useState } from 'react'
import LsWindow  from './components/ls/LsWindow'
import CommandLine from './components/CommandLine'


const App:FC = () => {
  console.log(process.env.REACT_APP_API_URL)
  const [ terminalText, setTerminalText] = useState('')
  
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <LsWindow/>
      <CommandLine text={terminalText} setText={setTerminalText}/>
    </div>
  );
}

export default App;
