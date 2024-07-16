import React from 'react';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            Authentication:{
                error: false,
                message: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/token/`;
        console.log(url);
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
            <div>
                <Row className="mb-4 mt-5">
                    <Col md={6} style={{ backgroundColor: 'white', margin:0, padding:5}}>
                        <video autoPlay muted loop id="myVideo" className='w-100' style={{ border:"none"}}>
                            <source src="https://botifywebappcreatedthumbnails.s3.eu-west-2.amazonaws.com/Screencast+from+07-16-2024+11%3A01%3A47+AM.webm" type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                    </Col>
                    <Col md={6}>
                        <Form className="mb-3 mt-5" onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <InputGroup hasValidation>
                                    <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            isInvalid={this.state.Authentication.error}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.Authentication.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </InputGroup>
                            </Row>
                            <Row className="mb-3">
                                <InputGroup hasValidation>
                                    <Form.Group as={Col} controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            isInvalid={this.state.Authentication.error}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.Authentication.message}
                                        </Form.Control.Feedback>
                                        <Button type="submit" className='mt-2' variant="light">Login</Button>
                                    </Form.Group>
                                </InputGroup>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Login;