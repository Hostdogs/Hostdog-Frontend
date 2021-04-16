import React, { useState } from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap";

const DogProfileTab = () => {
  //Add ListItem
  const AddedElement = () => (
    <ListGroupItem>
      <img
        src={process.env.PUBLIC_URL + "/doge.png"}
        width="125"
        height="169"
      />
      kuyBasLeng {count}
    </ListGroupItem>
  );

  const [count, setCount] = useState(0);

  //set per page
  const [currentPage, setCurrentPage] = useState(1);
  const posts = Array(count).fill(<AddedElement />);

  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div>
      <Row>
        <Col xs="12">
          <h4 style={{ marginTop: "1%" }}>สุนัขของคุณ</h4>
          <Button
            color="primary"
            onClick={() => setCount(count + 1)}
            style={{ marginTop: "1%" }}
          >
            เพิ่มโปรไฟล์สุนัขของคุณ
          </Button>
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
