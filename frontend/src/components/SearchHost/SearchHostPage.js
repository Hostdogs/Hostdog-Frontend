import React,{useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import SearchBox from './SearchBox'
import FilterOptionPane from './FilterOptionPane';


export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(true)
  
  return (
    <div>
      <br/>
      <FilterOptionPane/>
      {isSearch ? (<HostList />):(null)}
    </div>
  );
}
