import React, { FC } from 'react' // might need React 


interface CommandLineProps {
  text: string;
  setText: (e: string) => void;
}
const CommandLine:FC<CommandLineProps> = (props) => {
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
      props.setText(json)
    }
  }

  return (
    <div className='flex inline-flex justify-center p-[10px] bg-[#242424] ml-1.5'>
      <form onSubmit={handleSubmit}>
          <span className='text-white'>$ </span>

        <input className='bg-[black] text-white caret-white w-[500px]' 
              type="text"
              value={props.text} 
              onChange={e => props.setText(e.target.value)}/>
      </form>
    </div>
  )
}


export default CommandLine