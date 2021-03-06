import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import ServicePage from "./components/ServicePage/ServicePage";
import ProfilePage from "./components/UserProfile/ProfilePage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import ProgressPage from "./components/ProgressPage/ProgressPage";
import NotFoundPage from "./components/Handle/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route exact path="/signup" component={SignUpPage} />

          <Route exact path="/service/host/:host_id" component={ServicePage} />

          <Route exact path="/profile/:profile_id" component={ProfilePage} />

          <Route exact path="/history" component={HistoryPage} />

          <Route exact path="/progress/:service_id" component={ProgressPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
