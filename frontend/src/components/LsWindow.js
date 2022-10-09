// import { useState } from 'react'

const LsWindow = ({ls_list}) => {
  /*  constantly shows ls of current dir
  should be passed list of objs like {name, file_type, path}
  if file_type = dir, should be clickable to cd into it
  ls can even be sorted by most visited (then right click to reset this if desired)
  */

  const handleClick = async(txt) => {
    console.log(txt)
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
    }
    if (res.ok) {
      //do dispatch
    }

  }
  return (
    <div>
      {ls_list.map(i => {
        // need a better key
        let key = i.name+i.isdir.toString()
        return (
          <div key={key}>
            {!i.isdir ? 
                <p >{i.name}</p> :
                <p  style={{ cursor: "pointer",textDecoration: 'underline'}} onClick={()=> handleClick(i.path)}>{i.name}</p>
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