import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import ServicePage from "./components/ServicePage/ServicePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />

        <Route exact path="/signup" component={SignUpPage} />

        <Route exact path="/service" component={ServicePage} />
      </div>
    </Router>
  );
}

export default App;
