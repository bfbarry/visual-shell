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

  const NameContainer = ({ children }) => {
    return(
    <div className='inline rounded-md bg-[#414141] flex pl-1 h-[40px] basis-auto box-border'>
      { children }
    </div>)
  }

  const LSContainer = ({children}) => {
    return (
      <div className='rounded-sm flex flex-wrap bg-[#242424] h-[600px] w-[800px] m-1 justify-between'>
        {children}
      </div>
    )
  }


  return (
    <LSContainer>
      {ls && ls.map(i => {
        const key = i.name+i.isdir.toString()
        return (
          <NameContainer key={key}>
            {i.isdir  ? <span className='cursor-pointer underline'      onClick={() => cd_click(i.path)}> {i.name} </span> :
             i.iscode ? <span className='cursor-pointer text-green-500' onClick={() => code_click(i.path)}> {i.name} </span> :
                        <span> {i.name} </span>
            }
          </NameContainer>
          )
          }
        )
        }
    </LSContainer>
  )
}

export default LsWindow