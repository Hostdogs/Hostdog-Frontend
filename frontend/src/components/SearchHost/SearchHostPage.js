import React,{useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import SearchBox from './SearchBox'
import FilterOptionPane from './FilterOptionPane';


export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(false)
  
  return (
    <div style={{overflowX:"hidden"}}>
      <br/>
      <FilterOptionPane setisSearch={setisSearch}/>
      <br/>
      {isSearch ? (<HostList />):(null)}
    </div>
  );
}
