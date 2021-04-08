import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import HostList from "./HostList";

export default function SearchHostPage() {
  return (
    <div>
      <NavbarIsAuth />
      <div
        style={{
          margin: "auto",
          padding: "30px",
        }}
      >
        <SearchBox />
        <FilterBox />
        <HostList />
      </div>
    </div>
  );
}
