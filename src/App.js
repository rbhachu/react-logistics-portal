import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Nav from './Components/Nav'; 
import Search from './Components/Search'; 
import './assets/scss/main.scss';

function App() {

  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("an insecure password");
  const [loginData, setLoginData] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const loginUser = async ({ username, password }) => {
      
    try {
      const { data: response } = await axios.post(`${process.env.REACT_APP_URL_LOGIN}`, {
        "username": username, 
        "password": password
      })
      //console.log(response); // bearer token to be stored; c6364d40-df48-4514-8ef1-0d11c0b5e6e7
      setLoginData(response);
      setLoginStatus(200); 
    } catch (error) {
      setLoginStatus("error");
      //console.log(error)
    }

  };

  const handleSubmit = async (e) => {
    (e).preventDefault();
    loginUser({ username, password })
  }

return (
  <div className="App">

    <Nav />
      <Container fluid="sm">            
        <br />

        {(loginStatus !== 200) ? 
          
          (
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

                {(loginStatus === "error") ? <Alert variant="danger"><b>Invalid Login</b>
                <br />Please check Username / Password and try again!</Alert> : ''}

              </Col>
            </Row>
          )
        :
          (
            <Row>
              <Col>
                {loginStatus &&  (
                  <div className="Search">
                    <Search token={loginData} />
                  </div>
                )}
              </Col>
            </Row>
          )
        }
        
        </Container>
    </div>
  );
}

export default App;
