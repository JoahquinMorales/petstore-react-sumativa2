import React, { useState } from 'react';
import Header from './components/Header';
import Catalogo from './components/Catalogo';
import Contacto from './components/Contacto';
import { Container } from 'react-bootstrap';

function App() {
    const [carrito, setCarrito] = useState([]);

    const manejarAgregarCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        alert(`¡${producto.nombre} fue agregado al carrito!`);
    };

    return (
        <div style={{ backgroundColor: '#FFFDF0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header carritoCount={carrito.length} />
            
            <main style={{ flex: 1 }}>
                <Container className="text-center my-5 hero-section" style={{ background: 'linear-gradient(135deg, #2D5A27, #708090)', color: 'white', padding: '3rem', borderRadius: '12px' }}>
                    <h2 style={{ color: '#E6A100', fontWeight: 'bold' }}>Bienvenido a PetStore</h2>
                    <p className="fs-5">Las mejores comodidades para hacer feliz a tu mascota.</p>
                </Container>

                <Catalogo onAgregarAlCarrito={manejarAgregarCarrito} />
                <Contacto />
            </main>
            
            <footer style={{ backgroundColor: '#2D5A27', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: 'auto', borderTop: '4px solid #E6A100' }}>
                <p className="mb-0">Hecho por: Carlos Donoso, Benjamín Herrera, Joahquin Morales, Sergio Moya</p>
            </footer>
        </div>
    );
}

export default App;