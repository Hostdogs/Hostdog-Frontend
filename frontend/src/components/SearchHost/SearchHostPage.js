import React,{useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import SearchBox from './SearchBox'


export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(true)
  
  return (
    <div>
      <br/>
      <SearchBox/>
      {isSearch ? (<HostList />):(null)}
    </div>
  );
}
