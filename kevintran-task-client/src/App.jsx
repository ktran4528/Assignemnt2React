import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import List from './components/List';

import CreateStudent from './components/CreateStudent';

import Home from './components/Home';
//
function App() {

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For Students App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/create">Create Student</Nav.Link>
              <Nav.Link as={Link} to="/list">List of Students</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />         
          <Route path="create" element ={< CreateStudent />} />
          <Route path="list" element= {< List />}  />
          

        </Routes>
      </div>

    </Router>

  );
}
//
export default App;
