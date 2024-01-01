import { FC, useEffect, useRef, useState } from "react";


interface GroupState {
  groups: any[];
  groupIx: number;
}
interface H5HandlerProps {
  data: any;
}
export const H5Handler:FC<H5HandlerProps> = ({ data }) => {
  let css: React.CSSProperties = {
    width: '400px',
    height: '400px',
    color: 'black',
    background: 'gray'
  };
  const [ fullGroupName, setFullGroupName ] = useState('');
  const [ groups, setGroups ] = useState(data.groups);
  const [ groupIx, setGroupIx ] = useState(0);
  const groupsStack = useRef<GroupState[]>([]);
  
  useEffect(() => {
    if (data.groups.length) {
        setFullGroupName(`/${data.groups[0].name}`)
    }
  }, [])

  const nextGroupLayer = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    if (groups[groupIx].groups) {
      groupsStack.current.push({groups, groupIx})
      const newGroups = groups[groupIx].groups;
      const newGroupName = newGroups[0].name;
      setGroups(newGroups)
      setGroupIx(0)
      setFullGroupName(fullGroupName+'/'+ newGroupName)
    }
  }

  const prevGroupLayer = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const prevGroupState = groupsStack.current.pop();
    if (prevGroupState) {
      setGroups(prevGroupState.groups)
      setGroupIx(prevGroupState.groupIx)
      setFullGroupName(fullGroupName.split('/').slice(0,-1).join('/'))
    }
  }

  const nextGroupSibling = (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    if (groups.length - groupIx > 1) {
      setGroupIx(groupIx+1)
    }
  }
  // TODO
  // show list of groups, when click on one group show menu with dataset info
  // onClick: update groupIx, update base only of fullGroupPath
  console.log('rendered h5handler!')
  return (
    <div style={css}>
      <h1><b>{fullGroupName}</b></h1>
      <span>{groups.length} group(s)</span>
      <div style={{maxHeight:150, overflow:'auto'}}>
        <ol>
          {groups.length && groups.map((i: any, ix: number) => (
            <li key={i}>
              <span 
                className='cursor-pointer'
                onClick={() => {setGroupIx(ix)}}>
                {i.name}
              </span>
            </li>
            ))
          }
        </ol>
      </div>
      { groups[groupIx].name != '' &&
        <span>
          {JSON.stringify(groups[groupIx].datasets)}
        </span>
      }
      <br/><br/>
      <ol>
        <p><b>top level attrs</b></p>
        {data.attrs && 
          data.attrs.map((i: any, ix: number) => (
          <li key={ix}>{i.name} : {i.value}</li>
          ))
        }
      </ol>
      {groups[groupIx].groups.length ?
        <button 
          style={{background:'red'}} 
          onClick={nextGroupLayer}>
            next group layer
        </button>
        :
        <></>
      }
      {groupsStack.current.length ?
        <button 
          style={{background:'yellow'}} 
          onClick={prevGroupLayer}>
            prev group layer
        </button> 
        :
        <></>
      }
    </div>
  )
}