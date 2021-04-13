


import React, {useState} from 'react'
import "./App.css";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUpPage from './components/SignUp/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import SideBar from './components/sidebar/SideBar';
import HistoryPage from './components/HistoryPage/HistoryPage';


function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);


  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />

        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/history" component={HistoryPage}/>
      </div>
    </Router>
  );
}

export default App;
