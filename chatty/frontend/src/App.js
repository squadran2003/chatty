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
  let loggedIn = false;
  let url = "http://localhost:8000/api/token/";
  let refreshUrl = "http://localhost:8000/api/token/refresh/";
  // check if token exists
  if(localStorage.getItem('token')){
    loggedIn = true;
  }else{
    loggedIn = false;
  }

  return(
    <div>
       <Nav loggedIn={loggedIn}/>
        <Container fluid>
          <Routes>
              <Route path="/" element={loggedIn?<Home/>:<Navigate to="/login"/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout/>} />
          </Routes>
      </Container>
    </div>
  );
}

export default App;
