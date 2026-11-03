import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header({ carritoCount }) {
    return (
        <header style={{ backgroundColor: '#2D5A27', borderBottom: '4px solid #E6A100' }}>
            <Navbar expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <h1 style={{ color: '#E6A100', margin: 0 }}>PetStore 🐾</h1>
                        <p style={{ fontSize: '0.9rem', margin: 0, color: 'white' }}>Tu tienda de productos ecológicos para mascotas</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#inicio" className="text-white fw-bold">Inicio</Nav.Link>
                            <Nav.Link href="#productos" className="text-white fw-bold">Productos</Nav.Link>
                            <Nav.Link href="#contacto" className="text-white fw-bold">Contacto</Nav.Link>
                            <Nav.Item className="d-flex align-items-center ms-3">
                                <span className="badge bg-warning text-dark fs-6">🛒 Carrito ({carritoCount})</span>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;