import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import HostList from "./HostList";

export default function SearchHostPage() {
  return (
    <div className>
      <NavbarIsAuth />
      <SearchBox />
      <FilterBox />
      <HostList />
    </div>
  );
}
