import { FC, useEffect, useRef, useState } from "react";


interface GroupState {
  groups: any[];
  datasets: any[];
  attrs: any[];
}
interface H5HandlerProps {
  data: any;
}
export const H5Handler:FC<H5HandlerProps> = ({ data }) => {
  let css: React.CSSProperties = {
    width: '400px',
    height: '600px',
    color: 'black',
    background: 'gray',
    overflow: 'auto'
  };
  const [ fullGroupName, setFullGroupName ] = useState('/');
  const [ groups, setGroups ] = useState(data.groups);
  const [datasets, setDatasets ] = useState<any[]>([]);
  const [attrs, setAttrs ] = useState<any[]>([]);
  const groupsStack = useRef<GroupState[]>([]);

  const selectGroup = (e: React.ChangeEvent<any>, ix: number) => {
    e.preventDefault()
    if (groups[ix].groups) {
      groupsStack.current.push({groups, datasets, attrs})
      const newGroups = groups[ix].groups;
      setDatasets(groups[ix].datasets);
      setAttrs(groups[ix].attrs);
      setGroups(newGroups)
      let newName = '';
      if (fullGroupName == '/') {
        newName = fullGroupName + groups[ix].name
      }
      else {
        newName = fullGroupName +'/' + groups[ix].name
      }
      setFullGroupName(newName)
    }
  }

  const prevGroupLayer = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const prevGroupState = groupsStack.current.pop();
    // TODO RESET DATASETS< ATTRS
    if (prevGroupState) {
      setGroups(prevGroupState.groups);
      setDatasets(prevGroupState.datasets);
      setAttrs(prevGroupState.attrs);
      let name = fullGroupName.split('/').slice(0,-1).join('/')
      setFullGroupName(name);
    }
    if (! groupsStack.current.length) {
      // back to root
      setFullGroupName('/');
      setDatasets([]);
      setAttrs([]);
    }
  }

  // TODO
  // show list of groups, when click on one group show menu with dataset info
  // onClick: update groupIx, update base only of fullGroupPath
  return (
    <div style={css}>
      <h1><b>{fullGroupName}</b></h1>
      <span>{groups.length} group(s)</span>
      <div style={{maxHeight:150, overflow:'auto'}}>
        <ol>
          {groups.length && groups.map((i: any, ix: number) => (
            <li key={i.name}>
              <span 
                className='cursor-pointer'
                onClick={(e) => selectGroup(e, ix)}>
                {i.name}
              </span>
            </li>
            ))
          }
        </ol>
      </div>
      <br/><br/>
      { datasets.length ?
        <span>
          DSETS
          {JSON.stringify(datasets)}
        </span>
        :
        <></>
      }
      <br/><br/>
      { attrs.length ?
        <span>
          ATTRS
          {JSON.stringify(attrs)}
        </span>
        :
        <></>
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