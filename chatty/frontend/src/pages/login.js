import React from 'react';
import { Box, Button, TextField, Container, Typography } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/googleLoginButton';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            Authentication:{
                error: false,
                message: ''
            },
            googleClientId:undefined
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    componentWillMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-google-client-id/`)
        .then(response => response.json())
        .then(data => {
          this.setState({googleClientId: data.googleClientId})
        })
        .catch(error => console.error(error));
        
    };

    setUsername(username) {
        this.setState({username: username});
    }
    setPassword(password) {
        this.setState({password: password});
    }
    handleSubmit(event) {
        event.preventDefault();
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/token/`;
        // send a POST request to the backend
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: event.target.username.value, password: event.target.password.value}),
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Username or password is incorrect');
            }
            return response.json();
        
        })
        .then(data => {
            // store the token in localStorage
            localStorage.setItem('token', data.access);
            // redirect to home page
            window.location.href = '/';
        }).catch((error) => {
            this.setState({Authentication: {error: true, message: "Username or password is incorrect!"}});
        });
    }
    render() {
        return (
            <Container maxWidth="sm">
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 5 }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Login
              </Typography>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                margin="normal"
                variant="outlined"
                value={this.state.username}
                onChange={(e) => this.setUsername(e.target.value)}
                error={this.state.Authentication.error}
                helperText={this.state.Authentication.message}
              />
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={(e) => this.setPassword(e.target.value)}
                error={this.state.Authentication.error}
                helperText={this.state.Authentication.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              {this.state.googleClientId && (
                <GoogleOAuthProvider clientId={this.state.googleClientId}>
                  <GoogleLoginButton />
                </GoogleOAuthProvider>
              )}
            </Box>
          </Container>
        );
    }
}
export default Login;