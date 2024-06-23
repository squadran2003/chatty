import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './App.css';
import Nav from './nav.js';
import Login from './pages/login.js';
import Logout from './pages/logout.js';
import Home from './pages/home.js';

function App() {

  return(
    <div>
       <Nav loggedIn={false}/>
        <Container fluid>
          <Routes>
              <Route path="/" element={<Home/>}/>
          </Routes>
      </Container>
    </div>
  );
}

export default App;
