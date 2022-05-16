import React, {useState} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
// import {connect} from 'react-redux';

const NavBar = (props) => {

    const [token] = useState(props.token)

    const isAuth =  
    <>
        <Nav.Link href="/profil">Profil</Nav.Link>
        <Nav.Link href="/pins_create">Créer un Pin</Nav.Link>
        <Nav.Link href="/" onClick={()=>sessionStorage.clear()}>Déconnexion</Nav.Link>
    </> 
    const isGuest = 
    <>
        <Nav.Link href="/login">Connectez vous</Nav.Link>
        <Nav.Link href="/signup">Créez votre compte</Nav.Link>
    </>                                     

    return (
        <>
                <Navbar bg="light" expand="sm">
                    <Container>
                        <Navbar.Brand href="/">Pintabook</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                                <Nav className="me-auto">
                                    {token ? isAuth : isGuest}
                                </Nav>
                            </Navbar.Collapse>
                    </Container>
                </Navbar> 
            
        </>
    );
};

export default NavBar;