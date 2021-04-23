import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "reactstrap";
import DogProfileAddForm from "./DogProfileAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DogProfileTab = (props) => {
  const [newdogToggle, setnewdogToggle] = useState(false);
  const addtoggle = () => setnewdogToggle(!newdogToggle);
  //Add ListItem
  const AddedElement = () => <ListGroupItem></ListGroupItem>;
  const [count, setCount] = useState(0);

  //set per page
  const [currentPage, setCurrentPage] = useState(1);
  const posts = Array(count).fill(<AddedElement />);

  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  // console.log(count);
  return (
    <div>
      <ButtonGroup style={{ marginTop: "10px" }}>
        <DogProfileAddForm />
      </ButtonGroup>
      <hr />
      <ListGroup>{currentPosts}</ListGroup>
      <br />
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="##"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DogProfileTab;
