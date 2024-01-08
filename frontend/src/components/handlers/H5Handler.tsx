import { FC, useEffect, useRef, useState } from "react";
import '../../css/handlers.css'


interface GroupState {
  groups: any[];
  datasets: any[];
  attrs: any[];
}
interface H5HandlerProps {
  data: any;
}
export const H5Handler:FC<H5HandlerProps> = ({ data }) => {
  let parentCSS: React.CSSProperties = {
    width: '400px',
    height: '525px',
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
    <div style={parentCSS}>
      <h1><b>{fullGroupName}</b></h1>
      <span>{groups.length} group(s)</span>
      <div style={{maxHeight:150, overflow:'auto', display: 'flex', justifyContent: 'center'}}>
        <ol style={{display: 'flex', flexDirection:'row'}}>
          {groups.length ? groups.map((i: any, ix: number) => (
            <li key={i.name}>
              <button 
                className='cursor-pointer'
                style={{background: '#8590c7', fontWeight: 'bold', borderRadius: '6px', marginRight: '10px'}}
                onClick={(e) => selectGroup(e, ix)}>
                {i.name}
              </button>
            </li>
            ))
            :
            <li></li>
          }
        </ol>
      </div>
      <br/><br/>
      <h2 style={{fontWeight: 'bold'}}>datasets info</h2>
      { datasets.length ?
        <table>
          <thead style={{fontWeight:'bold'}}>
            <tr>
              <th>name</th>
              <th>shape</th>
              <th>dtype</th>
              <th>attrs</th>
            </tr>
          </thead>
          <tbody>
          {datasets.map((obj) => (
            <tr key={obj.name}>
              <td>{obj.name}</td>
              <td>{JSON.stringify(obj.shape)}</td>
              <td>{obj.dtype}</td>
              <td
                style={{maxWidth:'200px', maxHeight:'20px', overflow:'auto', whiteSpace:'nowrap'}}
              >{JSON.stringify(obj.attrs)}</td>
            </tr>
          ))}
          </tbody>
        </table>
        :
        <>[no datasets]</>
      }
      <br/><br/>
      <h2 style={{fontWeight: 'bold'}}>dataset attrs</h2>
      <ol>
        {attrs.length ?
            attrs.map((i: any, ix: number) => (
            <li key={ix}>{i.name} : {i.value}</li>
            ))
          :
          <p>[no attrs]</p>}

      </ol>
      <br/><br/>
      <ol>
        <p><b>root attrs</b></p>
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