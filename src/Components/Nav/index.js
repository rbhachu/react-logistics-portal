
//import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Nav() {

    return (
        <Navbar expand="sm" variant="light" bg="light" sticky="top">
            <Container>
                <Navbar.Brand href="/"><h1>Operations Team portal</h1></Navbar.Brand>
            </Container>
        </Navbar>
    );
  }
  
  export default Nav;