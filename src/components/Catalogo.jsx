import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Producto from './Producto';
import { listaProductos } from '../data/productos'; // Importamos tu base de datos simulada

function Catalogo({ onAgregarAlCarrito }) {
    return (
        <Container className="my-5" id="productos">
            <h2 className="mb-4" style={{ color: '#2D5A27', fontWeight: 'bold' }}>
                Nuestros Productos
            </h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {listaProductos.map(producto => (
                    <Col key={producto.id}>
                        <Producto 
                            producto={producto} 
                            onAgregarAlCarrito={onAgregarAlCarrito} 
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Catalogo;