import React from "react";
import { Jumbotron, Container } from "reactstrap";

export default function ProfileContent() {
  return (
    <div style={{ backgroundColor: "#ffe080" }}>
        <Container>
          <h1 className="display-3">Jumbotron</h1>
          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </Container>
    </div>
  );
}
