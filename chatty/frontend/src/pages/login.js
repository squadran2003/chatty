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
            email: '',
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

        // send a POST request to the backend
        fetch('http://localhost:8000/api/token/', {
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
            <Form className="mb-3 mt-4" onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <InputGroup hasValidation>
                        <Form.Group as={Col} md="4">

                        </Form.Group>
                            <Form.Group as={Col} md="4" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    isInvalid={this.state.Authentication.error}
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                        <Form.Group as={Col} md="4">
                        
                        </Form.Group>
                    </InputGroup>
                </Row>
                <Row className="mb-3">
                    <InputGroup hasValidation>
                        <Form.Group as={Col} md="4">
                        
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                isInvalid={this.state.Authentication.error}
                            />
                            <Form.Control.Feedback type="invalid">{this.state.Authentication.message}</Form.Control.Feedback>
                            <Button type="submit" className='mt-2'>Login</Button>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                        
                        </Form.Group>
                    </InputGroup>
                </Row>
        </Form>
        );
    }
}
export default Login;