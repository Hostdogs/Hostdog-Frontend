import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap";
import ModalDogForm from "./ModalDogForm";

const DogProfileTab = (props) => {
  //Add ListItem
  const AddedElement = () => (
    <ListGroupItem>
        
    </ListGroupItem>
  );

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

  console.log(count);
  return (
    <div>
      <Row>
        <Col xs="12">
          <Button 
            outline color="warning"
            onClick={() => setCount(count + 1)}
          >
            เพิ่มโปรไฟล์สุนัขของคุณ
          </Button>
          <ModalDogForm buttonLabel="เพิ่มโปรไฟล์สุนัขของคุณ" />{" "}
          <hr />
        </Col>
      </Row>
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
