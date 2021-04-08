import React from 'react'



import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUpPage from './components/SignUp/SignUpPage';
import HomePage from './components/HomePage/HomePage';



function App() {
  

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
