import React, { FC } from 'react';
import { useSetLs } from '../hooks/useSetLs';


interface CommandLineProps {
  text: string;
  setText: (e: string) => void;
}
const CommandLine:FC<CommandLineProps> = (props) => {
  const { setLs } = useSetLs();

  const handleSubmit = async(e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const res = await fetch('api/cli/tty', {
      method: 'POST',
      body: JSON.stringify({target: props.text}),
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
      setLs()
      // TODO show stdout, and clear input box
      // TODO record history to bash_history.log
      props.setText('')
    }
  }

  return (
    <div className='rounded-md flex inline-flex p-[10px] w-[800px] bg-[#242424] m-1 h-full'>
      <form onSubmit={handleSubmit}>
        <span className='text-white'>$ </span>
        <input className='bg-[black] text-white caret-white w-[700px]' 
              type="text"
              value={props.text} 
              onChange={e => props.setText(e.target.value)}/>
      </form>
    </div>
  )
}


export default CommandLine