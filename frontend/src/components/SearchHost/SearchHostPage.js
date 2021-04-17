import React,{useState} from 'react'

import HostList from "./HostList";

import "./SearchHost.css";
import Filterbox from './FilterOptionPane'
import FilterOption from './FilterOption';

export default function SearchHostPage() {
  const [isSearch, setisSearch] = useState(true)
  return (
    <div>
      
      <FilterOption/>

      {isSearch ? (<HostList />):(null)}
    </div>
  );
}
