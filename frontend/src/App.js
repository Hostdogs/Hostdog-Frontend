import React, {useState} from 'react'


import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUpPage from './components/SignUp/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import SideBar from './components/sidebar/SideBar';

function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
 
    <Router>
    <div className="App">
      
      <Route exact path="/"  component={HomePage}/>

      <Route exact path="/signup"  component={SignUpPage}/>


    </div>
    </Router>

  );
}

export default App;
