import React,{ useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import SearchBox from './SearchBox'
import FilterOptionPane from './FilterOptionPane';


export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(false)
  const [hostData, setHostData] = useState([]);
  const [isLoad, setisLoad] = useState(false)
  return (
    <div style={{overflowX:"hidden",paddingTop:"75px"}}>
      
      <FilterOptionPane setisSearch={setisSearch} setHostData={setHostData} setisLoad={setisLoad}/>
      
      {isSearch ? (<HostList hostData={hostData} setHostData={setHostData} isLoad={isLoad}/>):(null)}
    </div>
  );
}
