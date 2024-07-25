import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './App.css';
import Nav from './nav.js';
import Login from './pages/login.js';
import Logout from './pages/logout.js';
import Home from './pages/home.js';
import Intro from './pages/intro.js';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: teal[500],
    },
  },
});
theme = responsiveFontSizes(theme);
theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loggedIn:false,
      token:null
    }
  }

  componentWillMount(){
    const token = localStorage.getItem("token")
    const refresh = localStorage.getItem("refresh_token")
    if(!token){
      return
    }
    // send a POST request to the backend
    let url1 = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/chat/lobby/`;
    let url2 = `${process.env.REACT_APP_WS_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}/api/token/refresh/`;
    fetch(url1, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
          }
      })
      .then(response => {
        console.log(response.status)
          if (response.status === 200) {
              this.setState({loggedIn:true, token:token})
          }else{
              fetch(
               url2,{
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
                this.setState({loggedIn:true, token:data.access})
              })
          }
      
      })
      .catch((error) => {
          console.log(error)
      });
  }

  render(){
    return(
      <ThemeProvider theme={theme}>
        <div>
          <Nav loggedIn={this.state.loggedIn}/>
            <Container fluid>
              <Routes>
                  <Route path="/" element={this.state.loggedIn?<Home token={this.state.token}/>:<Intro/>}/>
                  <Route path="/logout" element={<Logout/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </Container>
        </div>
      </ThemeProvider>
    );

  }

}
export default App;
