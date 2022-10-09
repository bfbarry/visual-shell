// import { useState } from 'react'

const LsWindow = ({ls_list}) => {
  /*  constantly shows ls of current dir
  should be passed list of objs like {name, file_type, path}
  if file_type = dir, should be clickable to cd into it
  */
  return (
    <>
      {ls_list.map(i => {
        return (
          <p key={i}>{i}</p>
        )
      })}
    </>
  )
}

export default LsWindow