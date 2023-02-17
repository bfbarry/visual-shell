// import { useState } from 'react'

const LsWindow = ({ls, setLs}) => {
  /*  constantly shows ls of current dir
  ls: list of objs like {name, file_type, path}
  if file_type = dir, should be clickable to cd into it
  ls can even be sorted by most visited (then right click to reset this if desired)
  */
  const cd_click = async(txt) => {
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

  const code_click = async(txt) => {
    const res = await fetch('api/cli/code', {
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
      // setLs(json)
    }
  }
  //TODO back button for cd ..
  return (
    <div>
      {ls && ls.map(i => {
        // console.log(i)
        const key = i.name+i.isdir.toString()
        return (
          <div className='inline' key={key}>
            {i.isdir  ? <span className='cursor-pointer underline'      onClick={() => cd_click(i.path)}> {i.name} </span> :
             i.iscode ? <span className='cursor-pointer text-green-500' onClick={() => code_click(i.path)}> {i.name} </span> :
                        <span> {i.name} </span>
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