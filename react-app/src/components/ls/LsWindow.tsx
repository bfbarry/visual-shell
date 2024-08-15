import React, { FC, useEffect, useState } from 'react' // might need React 
import { useLsContext } from '../../hooks/useLsContext';
import { useSetLs } from '../../hooks/useSetLs';
import { LsCurrPath } from './LsCurrPath';
import { BookmarkTab } from './BookmarkTab'
import { LsTextItem } from './LsTextItem';
import { getBaseNameWithoutExtension } from '../../utils/getBaseNameWithoutExtension';
import { Handler } from '../handlers/Handler';


interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
}
const SearchBar:FC<SearchBarProps> = (props) => {
  // TODO : highlight searched substring or regex
  // This is a high level component because otherwise it loses focus on each rerender (composition vs inheritance!)
  
  return (
    <div className='p-[10px] bg-[#242424] rounded-b-md'>
      <input className='bg-[black] text-white caret-white' 
            type="text"
            value={props.searchTerm} 
            onChange={e => props.setSearchTerm(e.target.value)}/>
    </div>
  )
}


const LsWindow:FC = () => {
  /*  shows ls of current dir
  ls: list of objs like {name, file_type, path}
  if file_type = dir, is be clickable to cd into it
  TODO
    - ls can even be sorted by most visited (then right click to reset this if desired)
  */
  const [searchTerm, setSearchTerm] = useState(''); // must be filtered in jsx, otherwise setLs doesn't work in a function!
  const { ls, dispatch } = useLsContext();
  const [currPath, setCurrPath] = useState('');
  const { setLs, lsIsLoading } = useSetLs();
  // const [ menuPosition, setMenuPosition] = useState({x:0, y:0});
  // const [ showMenu, setShowMenu ] = useState(false);
  // const [ currMenuPath, setCurrMenuPath ] = useState('');
  const [ handlerType, setHandlerType ] = useState('');
  const [ showHandler, setShowHandler ] = useState(false);
  const [ handlerData, setHandlerData ] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL

  // TODO would rather use null so you have full text, but doesn't work
  // const container_bg = '#242424'
  
  useEffect(() => {
    setLs()
  }, [])

  useEffect(() => {
    if (ls.length) {
      setCurrPath(ls[0].path)
    }
  }, [ls])

  const cd_click = async(txt: string) => {
    const res = await fetch(`${apiUrl}/cli/cd`, {
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
      dispatch({type: 'SET_LS', payload: json})
      setSearchTerm('')
    }
  }

  const code_click = async(txt: string) => {
    const res = await fetch(`${apiUrl}/cli/code`, {
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
    }
  }

  const handler_click = async(handler_path: string, file_path: string) => {
    const res = await fetch(`${apiUrl}/cli/handle`, {
      method: 'POST',
      body: JSON.stringify({handler_path, file_path}),
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
      const handlerName = getBaseNameWithoutExtension(handler_path);
      setHandlerType(handlerName)
      setHandlerData(json);
      setShowHandler(true);
    }
  }

  interface NameContainerProps{
    children: React.ReactNode;
  }
  const NameContainer:FC<NameContainerProps> = ({children}) => {
    // TODO this should be able to adjust to  resize
    return(
    <div className='inline rounded-md bg-[#414141] flex pl-1 p-[5px] basis-auto'>
      { children }
    </div>)
  }

  interface LsContainerProps{
    children: React.ReactNode;
  }
  const LsContainer:FC<LsContainerProps> = ({children}) => {
    return (
      <div className='rounded-t-md flex flex-wrap bg-[#242424] h-[600px] gap-[15px] content-start overflow-auto p-[10px] '>
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-row">
    {ls.length &&
      <div className="w-full m-1">
        <LsCurrPath currPath={currPath} setCurrPath={setCurrPath}/>
        <LsContainer>
          {ls.slice(1).filter(i => i.name.includes(searchTerm) )
                  .map(i => {
            const key = i.name+i.isdir.toString()
            return (
              <NameContainer key={key}>
                {i.isdir  ? <span className='cursor-pointer' onClick={() => cd_click(i.path)}  > 
                              <LsTextItem text={i.name} ftypecss="text-white underline" searchTerm={searchTerm}/> 
                            </span> :
                i.is_text ? <span className='cursor-pointer' onClick={() => code_click(i.path)}> 
                              <LsTextItem text={i.name} ftypecss="text-green-500" searchTerm={searchTerm}/> 
                            </span> :
                i.handler? <span className='cursor-pointer' onClick={() => handler_click(i.handler, i.path)}> 
                              <LsTextItem text={i.name} ftypecss="text-[#8803fc]" searchTerm={searchTerm}/> 
                            </span> :
                            <span> 
                              <LsTextItem text={i.name} ftypecss="text-black" searchTerm={searchTerm}/>
                            </span>
                }
              </NameContainer>
              )
              }
            )
            }
        </LsContainer>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} key="searchbar"/>
      </div>
    }
    {/* TODO should be part of above div so shrinks along with LS */}
    <BookmarkTab/>
    {
      showHandler && 
      <Handler handlerName={handlerType} data={handlerData} hideSelf={() => setShowHandler(false)}/>
    }
    </div>
  )
}

export default LsWindow