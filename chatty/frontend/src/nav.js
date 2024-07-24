import React from 'react';
// import Container from 'react-bootstrap/Container';
// import NavbarText from 'react-bootstrap/esm/NavbarText';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function defaultNav({loggedIn}){
  let navBarTextLink = <Button color="inherit" component={Link} to="/login">Login</Button>;
  if(loggedIn){
    navBarTextLink = <Button color="inherit" component={Link} to="/logout">Logout</Button>;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link} to="/"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChattyMusic
          </Typography>
         {navBarTextLink}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default defaultNav;