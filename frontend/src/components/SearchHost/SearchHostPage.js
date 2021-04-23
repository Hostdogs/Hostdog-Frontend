import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";

import HostList from "./HostList";

import "./SearchHost.css";

export default function SearchHostPage() {
  return (
    <div>
      <SearchBox />
      <HostList />
    </div>
  );
}
