import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const ContentNoAuth = (props) => {
  return (
    <div >
      <Jumbotron >
        <br/><br/>
        <div style={{textAlign:"center"}}>
            <img src={process.env.PUBLIC_URL + '/doge.png'}width="250"height="338" /> 
        </div>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button href="/profile" color="primary">ทดลองหน้าโปรไฟล์</Button>
          
        </p>
      </Jumbotron>
    </div>
  );
};

export default ContentNoAuth;
