// import { useState } from 'react'

const LsWindow = ({ls, setLs}) => {
  /*  constantly shows ls of current dir
  ls: list of objs like {name, file_type, path}
  if file_type = dir, should be clickable to cd into it
  ls can even be sorted by most visited (then right click to reset this if desired)
  */
  const handleClick = async(txt) => {
    const res = await fetch('api/cli/cd', {
      method: 'POST',
      body: JSON.stringify({target: txt}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    if (!res.ok) {
      //set error here
      console.log('error here')
    }
    if (res.ok) {
      //do dispatch
      setLs(json)
    }

  }
  return (
    <div>
      {ls && ls.map(i => {
        // console.log(i)
        const key = i.name+i.isdir.toString()
        return (
          <div key={key}>
            {i.isdir ? //TODO: code should open vscode
                <p  className='cursor-pointer underline' onClick={()=> handleClick(i.path)}>{i.name}</p> :
                <p >{i.name}</p>
            }


          </div>
          )
          }
        )
        }
    </div>
  )
}

export default LsWindow