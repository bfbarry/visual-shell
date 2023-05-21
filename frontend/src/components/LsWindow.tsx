import React, { FC, useState } from 'react' // might need React 
import { LsObject } from '../types'

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
}
const SearchBar:FC<SearchBarProps> = (props) => {
  // TODO : highlight searched substring or regex
  // This is a high level component because otherwise it loses focus on each rerender (composition vs inheritance!)
  
  return (
    <div className='flex inline-flex justify-center p-[10px] bg-[#242424]'>
      <input className='bg-[black] text-white caret-white' 
            type="text"
            value={props.searchTerm} 
            onChange={e => props.setSearchTerm(e.target.value)}/>
    </div>
  )
}

interface LsWindowProps {
  ls: LsObject[];
  setLs: (o: LsObject[]) => void
}
const LsWindow:FC<LsWindowProps> = ({ls, setLs}) => {
  /*  constantly shows ls of current dir
  ls: list of objs like {name, file_type, path}
  if file_type = dir, is be clickable to cd into it
  TODO
    - ls can even be sorted by most visited (then right click to reset this if desired)
  */
  const [searchTerm, setSearchTerm] = useState(''); // must be filtered in jsx, otherwise setLs doesn't work in a function!
                                                    // TODO would rather use null so you have full text, but doesn't work
  // const container_bg = '#242424'
  
  const cd_click = async(txt: string) => {
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
      console.log('error fetch api/cli/cd')
    }
    if (res.ok) {
      //do dispatch
      setLs(json)
      setSearchTerm('')
    }
  }

  const code_click = async(txt: string) => {
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
      console.log(`error ${json}`)
    }
    if (res.ok) {
      //do dispatch
      // setLs(json)
    }
  }

  interface NameContainerProps{
    children: React.ReactNode;
  }
  const NameContainer:FC<NameContainerProps> = ({children}) => {
    return(
    <div className='inline rounded-md bg-[#414141] flex pl-1 h-[40px] basis-auto'>
      { children }
    </div>)
  }

  interface LsContainerProps{
    children: React.ReactNode;
  }
  const LsContainer:FC<LsContainerProps> = ({children}) => {
    return (
      <div className='rounded-sm flex flex-wrap bg-[#242424] h-[600px] w-[800px] m-1 gap-[15px] content-start p-[10px]'>
        {children}
      </div>
    )
  }

  interface LsTextItemProps{
    text: string;
    ftypecss: string;
  }
  const LsTextItem:FC<LsTextItemProps> = ({text, ftypecss}) => {
    // set highlight on search term
    const searchTermCSS = 'text-orange-600'
    const split = text.split(searchTerm)
    const terms_inserted = []
    for (let i=0; i<split.length; i++) {
        // insert non searchTerm
        if (split[i] !== '') {
            terms_inserted.push({text: split[i], css: ftypecss})
        }
        // insert searchTerm
        if (searchTerm !== '' && i !== split.length-1) {
            terms_inserted.push({text: searchTerm, css: searchTermCSS})
        }
    } 
    return (
      <>
      {terms_inserted.map((i, ix) => {
        const css = i.css
        return (
          <span key={ix} className={css}>{i.text}</span>
        )
      })}
      </>
    )
  }

  return (
    <>
      <LsContainer>
        {ls && ls.filter(i => i.name.includes(searchTerm) )
                 .map(i => {
          const key = i.name+i.isdir.toString()
          return (
            <NameContainer key={key}>
              {i.isdir  ? <span className='cursor-pointer' onClick={() => cd_click(i.path)}  > <LsTextItem text={i.name} ftypecss="text-white underline"/> </span> :
               i.iscode ? <span className='cursor-pointer' onClick={() => code_click(i.path)}> <LsTextItem text={i.name} ftypecss="text-green-500"/> </span> :
                          <span> <LsTextItem text={i.name} ftypecss="text-black"/> </span>
              }
            </NameContainer>
            )
            }
          )
          }
      </LsContainer>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </>
  )
}

export default LsWindow