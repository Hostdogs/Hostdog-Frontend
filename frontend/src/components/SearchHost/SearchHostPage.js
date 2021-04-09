import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import HostList from "./HostList";
import "./SearchHost.css";
export default function SearchHostPage() {
  return (
    <div>
      <NavbarIsAuth />
      <SearchBox />
      <FilterBox />
      <HostList />
    </div>
  );
}
