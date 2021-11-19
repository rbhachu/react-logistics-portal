import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {

        const [loginData, setLoginData] = useState(''); // api response
        const [loginStatus, setLoginStatus] = useState('test1'); // api response
    
        function loginUser({ username, password }) {
                
            axios.post(`${process.env.REACT_APP_URL_LOGIN}`, {
                "username": username, 
                "password": password
            })
            .then(res => {
                console.log(`res.data: ${res.data}`); // bearer token to be stored; c6364d40-df48-4514-8ef1-0d11c0b5e6e7
                console.log(`res.status: ${res.status}`); // http server response status 200
                setLoginData(res.data);
                setLoginStatus(res.status);
            })
            .catch(err => {
                setLoginStatus("error");
                console.log(err) 
            });
                    
        }
        
        const [username, setUsername] = useState("test");
        const [password, setPassword] = useState("an insecure password");

        const handleSubmit = async e => {
            e.preventDefault();
            loginUser({ username, password })
        }

    return (
        <Row>
            <Col>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <br />

            {(loginStatus === "error") ? <Alert variant="danger"><b>Invalid Login</b><br />Please check Username / Password and try again!</Alert> : ""}
        
        </Col>
    </Row>
    ) 

}
export default LoginForm;