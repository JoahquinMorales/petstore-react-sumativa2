import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Contacto() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = {};
        let valido = true;

        if (nombre.trim().length < 1) { nuevosErrores.nombre = "El campo no puede estar vacío."; valido = false; }
        else if (nombre.length > 100) { nuevosErrores.nombre = "Ingresa un nombre de máximo 100 caracteres."; valido = false; }

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(email)) { nuevosErrores.email = "Ingresa un correo electrónico válido."; valido = false; }
        
        if (mensaje.trim().length < 1) { nuevosErrores.mensaje = "El campo no puede estar vacío."; valido = false; }
        else if (mensaje.length > 500) { nuevosErrores.mensaje = "Ingresa un mensaje de máximo 500 caracteres."; valido = false; }

        setErrores(nuevosErrores);

        if (valido) {
            setExito(true);
            setNombre(''); setEmail(''); setMensaje('');
        } else {
            setExito(false);
        }
    };

    return (
        <Container className="my-5" id="contacto">
            <h2 className="mb-4" style={{ color: '#2D5A27', fontWeight: 'bold' }}>Contáctanos</h2>
            {exito && <Alert variant="success">Mensaje enviado correctamente.</Alert>}
            
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white" style={{ borderColor: '#2D5A27' }}>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#2D5A27' }}>Nombre completo</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} isInvalid={!!errores.nombre} />
                    <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#2D5A27' }}>Correo electrónico</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errores.email} />
                    <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold" style={{ color: '#2D5A27' }}>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={3} value={mensaje} onChange={(e) => setMensaje(e.target.value)} isInvalid={!!errores.mensaje} />
                    <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" style={{ backgroundColor: '#E6A100', color: '#2D5A27', fontWeight: 'bold', border: 'none' }}>
                    Enviar Mensaje
                </Button>
            </Form>
        </Container>
    );
}

export default Contacto;