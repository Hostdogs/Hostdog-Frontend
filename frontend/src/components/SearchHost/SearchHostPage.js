import NavbarIsAuth from "../Navbar/NavbarIsAuth";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import HostList from "./HostList";
import { Container,Row,Col } from "reactstrap";
import "./SearchHost.css";

export default function SearchHostPage() {
  return (
    <div>



      <NavbarIsAuth />
    
      <Container className="search-container">

          <Row>
            <SearchBox />
          </Row>
          <Row>
            <FilterBox />
          </Row>

      </Container>

      <Container className="host-container">
        <HostList />
      </Container>

   
    </div>
  );
}
