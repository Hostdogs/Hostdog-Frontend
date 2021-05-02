import React,{ useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import SearchBox from './SearchBox'
import FilterOptionPane from './FilterOptionPane';


export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(false)
  const [hostData, setHostData] = useState([]);

  return (
    <div style={{overflowX:"hidden"}}>
      <br/>
      <FilterOptionPane setisSearch={setisSearch} setHostData={setHostData}/>
      <br/>
      {isSearch ? (<HostList hostData={hostData} setHostData={setHostData}/>):(null)}
    </div>
  );
}
