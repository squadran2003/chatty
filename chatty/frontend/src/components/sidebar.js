import React, { Component } from 'react';
import { Box, Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Badge, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      onlineUsers: [],
    };
    this.onlineUsers = this.onlineUsers.bind(this);
  }

  componentDidMount() {
    this.onlineUsers();
  }

  onlineUsers = () => {
    const url = `http://localhost:8080/ws/chat/users/online_users/?token=${this.props.token}`;
    console.log("url", url);
    this.socket = new WebSocket(url);
    this.socket.onopen = (e) => {
      console.log('web socket open', e);
    };

    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      this.setState({
        onlineUsers: data.users,
      });
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { mobileOpen, onlineUsers } = this.state;

    const drawer = (
      <Box sx={{ width: 250 }} role="presentation" onClick={this.handleDrawerToggle} onKeyDown={this.handleDrawerToggle}>
        <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
          Online Users
        </Typography>
        <List>
          {onlineUsers.map((user, index) => (
            <ListItem key={index} button>
              <Badge color="success" variant="dot" sx={{ mr: 2 }} />
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Online Users
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </nav>
      </>
    );
  }
}

export default Sidebar;
