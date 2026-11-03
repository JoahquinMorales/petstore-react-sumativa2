import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Producto({ producto, onAgregarAlCarrito }) {
    return (
        <Card className="text-center shadow-sm h-100" style={{ border: '2px solid #708090' }}>
            <Card.Img 
                variant="top" 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ height: '150px', objectFit: 'contain', padding: '1rem' }} 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title style={{ color: '#2D5A27', fontWeight: 'bold' }}>
                    {producto.nombre}
                </Card.Title>
                <Card.Text className="fs-4 fw-bold mb-4" style={{ color: '#2D5A27' }}>
                    ${producto.precio.toLocaleString("es-CL")}
                </Card.Text>
                
                <Button 
                    className="mt-auto" 
                    style={{ backgroundColor: '#2D5A27', border: 'none', color: 'white' }}
                    onClick={() => onAgregarAlCarrito(producto)}
                >
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Producto;