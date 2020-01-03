import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Details from './components/Details';
import Edit from './components/Edit';
import Adduser from './components/Adduser';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Exercise</Link></li>
          <li><Link to="/addUser">Add User</Link></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/details/:id" component={Details} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/addUser" component={Adduser} />
      </Router>
    </div>
  );
}

export default App;
