import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import SideBar from '../../sidebar/SideBar';

const ContentIsAuth = (props) => {
  return (
    <div>
      <Jumbotron >
        <div style={{textAlign:"center"}}>
            <img src={process.env.PUBLIC_URL + '/doge.png'}width="250"height="338" /> 
        </div>
        <h1 className="display-3">Hello, Pat ทำงานต่อด้วย!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">อยากเสือกก็กด</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default ContentIsAuth;
