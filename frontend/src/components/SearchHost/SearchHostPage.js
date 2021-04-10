import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import HostList from "./HostList";
import { Container } from "reactstrap";
import "./SearchHost.css";
export default function SearchHostPage() {
  return (
    <div>
      <NavbarIsAuth />

      <Container className="searchTop">
        <SearchBox />
        <FilterBox />
      </Container>
      <Container>
        <HostList />
      </Container>
    </div>
  );
}
