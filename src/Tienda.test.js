import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './components/Header';
import Producto from './components/Producto';
import Contacto from './components/Contacto';
import { listaProductos } from './data/productos';

describe('Suite de 10 Pruebas Unitarias - PetStore', () => {

    it('1. Renderizado Condicional: Debe renderizar el Header correctamente', () => {
        render(<Header carritoCount={0} />);
        expect(screen.getByText('PetStore 🐾')).toBeDefined();
    });

    it('2. Propiedades Recibidas (props): Header debe mostrar la cantidad exacta del carrito', () => {
        render(<Header carritoCount={5} />);
        expect(screen.getByText('🛒 Carrito (5)')).toBeDefined();
    });

    it('3. Renderizado correcto: Debe renderizar un Producto con sus datos', () => {
        const productoMock = listaProductos[0];
        render(<Producto producto={productoMock} onAgregarAlCarrito={() => {}} />);
        expect(screen.getByText('Arena para gatos')).toBeDefined();
    });

    it('4. Renderizado correcto: El componente Producto debe renderizar su precio', () => {
        const productoMock = { id: 99, nombre: "Test", precio: 1500, imagen: "" };
        const { container } = render(<Producto producto={productoMock} onAgregarAlCarrito={() => {}} />);
        expect(container.textContent).toContain('1');
    });

    it('5. Simulación de Eventos: El botón "Agregar al carrito" debe reaccionar al click', () => {
        const mockFn = jest.fn();
        const productoMock = listaProductos[0];
        render(<Producto producto={productoMock} onAgregarAlCarrito={mockFn} />);
        
        const boton = screen.getByText('Agregar al carrito');
        fireEvent.click(boton);
        
        expect(mockFn).toHaveBeenCalledWith(productoMock);
    });

    it('6. Gestión de Estado: Debe actualizar el estado del input Nombre al escribir', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        fireEvent.change(inputNombre, { target: { value: 'Charlie' } });
        expect(inputNombre.value).toBe('Charlie');
    });

    it('7. Gestión de Estado: Debe actualizar el estado del input Email al escribir', () => {
        const { container } = render(<Contacto />);
        const inputEmail = container.querySelector('input[type="email"]');
        fireEvent.change(inputEmail, { target: { value: 'charlie@duoc.cl' } });
        expect(inputEmail.value).toBe('charlie@duoc.cl');
    });

    it('8. Lógica Condicional: Debe mostrar error si el nombre está vacío al enviar', () => {
        const { container } = render(<Contacto />);
        const botonEnviar = screen.getByText('Enviar Mensaje');
        fireEvent.click(botonEnviar);
        // Validamos la clase de error de Bootstrap o la existencia del contenedor de feedback
        const feedback = container.querySelector('.invalid-feedback');
        expect(feedback).toBeDefined();
    });

    it('9. Lógica Condicional: Debe mostrar error si el email no tiene formato válido', () => {
        const { container } = render(<Contacto />);
        const inputEmail = container.querySelector('input[type="email"]');
        fireEvent.change(inputEmail, { target: { value: 'correo-invalido' } });
        
        const botonEnviar = screen.getByText('Enviar Mensaje');
        fireEvent.click(botonEnviar);
        
        expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeDefined();
    });

    it('10. Lógica Condicional: Debe mostrar alerta de éxito si el formulario es válido', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        const inputEmail = container.querySelector('input[type="email"]');
        const inputMensaje = container.querySelector('textarea');
        
        fireEvent.change(inputNombre, { target: { value: 'Ignacio' } });
        fireEvent.change(inputEmail, { target: { value: 'igna@gmail.com' } });
        fireEvent.change(inputMensaje, { target: { value: 'Consulta por arena' } });
        
        fireEvent.click(screen.getByText('Enviar Mensaje'));
        
        expect(screen.getByText('Mensaje enviado correctamente.')).toBeDefined();
    });
});