import React from 'react';
import {   GoogleLogin } from '@react-oauth/google';

class GoogleLoginButton extends React.Component {
    constructor(props) {
        super(props);
    }
    handleLoginSuccess = async (response) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/google/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      })
      .then(res => {
        return res.json();
      })
    .then(data => {
        console.log(data);
        // Handle the response, e.g., store the token, redirect user, etc.
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        window.location.href = '/';
    })
    .catch(err => {
          console.error(err);
      });
    };
    handleLoginError = (error) => {
        console.error('Login failed:', error);
    };
    render() {
            return (
               <GoogleLogin
                onSuccess={this.handleLoginSuccess}
                onError={this.handleLoginError}
                size="large"
                style={{ width: '100%' }}
               />
        )
    }
}
export default GoogleLoginButton;