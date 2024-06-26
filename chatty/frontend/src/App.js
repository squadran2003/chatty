import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './App.css';
import Nav from './nav.js';
import Login from './pages/login.js';
import Logout from './pages/logout.js';
import Home from './pages/home.js';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedIn:false
    }
  }

  componentWillMount(){
    const token = localStorage.getItem("token")
    const refresh = localStorage.getItem("refresh_token")
    if(!token){
      return
    }
    console.log(token)
    // send a POST request to the backend
    fetch('http://localhost:8080/chat/lobby/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
          }
      })
      .then(response => {
        console.log(response.status)
          if (response.status === 200) {
              this.setState({loggedIn:true})
          }else{
              fetch(
                'http://localhost:8080/api/token/refresh/',{
                  method:'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({refresh: refresh}),
                }
              ).then(response=>{
                return response.json();
              })
              .then(data=>{
                console.log(data);
              })
          }
      
      })
      .catch((error) => {
          console.log(error)
      });
  }

  render(){
    return(
      <div>
         <Nav loggedIn={this.state.loggedIn}/>
          <Container fluid>
            <Routes>
                <Route path="/" element={this.state.loggedIn?<Home/>:<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Container>
      </div>
    );

  }

}
export default App;
