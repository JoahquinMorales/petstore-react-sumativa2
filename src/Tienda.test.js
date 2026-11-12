import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import Producto from './components/Producto';
import Catalogo from './components/Catalogo';
import Contacto from './components/Contacto';
import { listaProductos } from './data/productos';

describe('Suite de Pruebas Unitarias - PetStore', () => {

    it('1. Renderiza el título principal del Header', () => {
        render(<Header carritoCount={0} />);
        expect(screen.getByText('PetStore 🐾')).toBeTruthy();
    });

    it('2. Muestra la cantidad correcta de productos en el carrito', () => {
        render(<Header carritoCount={5} />);
        expect(screen.getByText('🛒 Carrito (5)')).toBeTruthy();
    });

    it('3. Renderiza el nombre del producto en la tarjeta', () => {
        const productoMock = listaProductos[0];
        render(<Producto producto={productoMock} onAgregarAlCarrito={() => {}} />);
        expect(screen.getByText('Arena para gatos')).toBeTruthy();
    });

    it('4. Formatea el precio del producto correctamente', () => {
        const productoMock = { id: 99, nombre: 'Test', precio: 1500, imagen: '' };
        const { container } = render(<Producto producto={productoMock} onAgregarAlCarrito={() => {}} />);
        expect(container.textContent).toContain('$1.500');
    });

    it('5. Ejecuta el callback al hacer clic en "Agregar al carrito"', () => {
        const mockFn = jasmine.createSpy('onAgregarAlCarrito');
        const productoMock = listaProductos[0];
        render(<Producto producto={productoMock} onAgregarAlCarrito={mockFn} />);
        
        fireEvent.click(screen.getByText('Agregar al carrito'));
        
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(productoMock);
    });

    it('6. Actualiza el valor del campo Nombre al escribir', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        fireEvent.change(inputNombre, { target: { value: 'Charlie' } });
        expect(inputNombre.value).toBe('Charlie');
    });

    it('7. Actualiza el valor del campo Email al escribir', () => {
        const { container } = render(<Contacto />);
        const inputEmail = container.querySelector('input[type="email"]');
        fireEvent.change(inputEmail, { target: { value: 'charlie@duoc.cl' } });
        expect(inputEmail.value).toBe('charlie@duoc.cl');
    });

    it('8. Muestra mensaje de error si los campos vacíos son enviados', () => {
        render(<Contacto />);
        fireEvent.click(screen.getByText('Enviar Mensaje'));
        expect(screen.getAllByText('El campo no puede estar vacío.').length).toBe(2);
    });

    it('9. Muestra mensaje de error si el formato del correo no es válido', () => {
        const { container } = render(<Contacto />);
        const inputEmail = container.querySelector('input[type="email"]');
        fireEvent.change(inputEmail, { target: { value: 'correo-invalido' } });
        
        fireEvent.click(screen.getByText('Enviar Mensaje'));
        
        expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeTruthy();
    });

    it('10. Muestra mensaje de éxito al enviar un formulario válido', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        const inputEmail = container.querySelector('input[type="email"]');
        const inputMensaje = container.querySelector('textarea');
        
        fireEvent.change(inputNombre, { target: { value: 'Ignacio' } });
        fireEvent.change(inputEmail, { target: { value: 'igna@gmail.com' } });
        fireEvent.change(inputMensaje, { target: { value: 'Consulta por arena' } });
        
        fireEvent.click(screen.getByText('Enviar Mensaje'));
        
        expect(screen.getByText('Mensaje enviado correctamente.')).toBeTruthy();
    });

    it('11. Verifica los enlaces del Header hacia sus respectivas secciones', () => {
        render(<Header carritoCount={0} />);
        expect(screen.getByText('Productos').getAttribute('href')).toBe('#productos');
        expect(screen.getByText('Contacto').getAttribute('href')).toBe('#contacto');
    });

    it('12. Asigna los atributos alt y src en la imagen del producto', () => {
        const productoMock = { id: 98, nombre: 'Producto Mock', precio: 2000, imagen: '/mock.png' };
        const { container } = render(<Producto producto={productoMock} onAgregarAlCarrito={() => {}} />);
        const img = container.querySelector('img');
        expect(img.getAttribute('alt')).toBe('Producto Mock');
        expect(img.getAttribute('src')).toBe('/mock.png');
    });

    it('13. Renderiza una tarjeta por cada producto recibido en el catálogo', () => {
        const productosMock = [
            { id: 101, nombre: 'Producto A', precio: 1500, imagen: '' },
            { id: 102, nombre: 'Producto B', precio: 25000, imagen: '' }
        ];
        render(<Catalogo productos={productosMock} onAgregarAlCarrito={() => {}} />);
        expect(screen.getAllByText('Agregar al carrito').length).toBe(2);
        expect(screen.getByText('Producto B')).toBeTruthy();
    });

    it('14. Envía el producto correcto al handler al presionar el botón en Catalogo', () => {
        const mockFn = jasmine.createSpy('onAgregarAlCarrito');
        const productosMock = [
            { id: 101, nombre: 'Producto A', precio: 1500, imagen: '' },
            { id: 102, nombre: 'Producto B', precio: 25000, imagen: '' }
        ];
        render(<Catalogo productos={productosMock} onAgregarAlCarrito={mockFn} />);

        fireEvent.click(screen.getAllByText('Agregar al carrito')[1]);

        expect(mockFn).toHaveBeenCalledWith(productosMock[1]);
    });

    it('15. Muestra error cuando el campo nombre supera los 100 caracteres', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        fireEvent.change(inputNombre, { target: { value: 'a'.repeat(101) } });

        fireEvent.click(screen.getByText('Enviar Mensaje'));

        expect(screen.getByText('Ingresa un nombre de máximo 100 caracteres.')).toBeTruthy();
    });

    it('16. Restablece el valor de los inputs del formulario tras un envío exitoso', () => {
        const { container } = render(<Contacto />);
        const inputNombre = container.querySelector('input[type="text"]');
        const inputEmail = container.querySelector('input[type="email"]');
        const inputMensaje = container.querySelector('textarea');

        fireEvent.change(inputNombre, { target: { value: 'Ignacio' } });
        fireEvent.change(inputEmail, { target: { value: 'igna@gmail.com' } });
        fireEvent.change(inputMensaje, { target: { value: 'Consulta por arena' } });
        fireEvent.click(screen.getByText('Enviar Mensaje'));

        expect(inputNombre.value).toBe('');
        expect(inputEmail.value).toBe('');
        expect(inputMensaje.value).toBe('');
    });

    it('17. Incrementa el contador del carrito al agregar un producto desde App', () => {
        spyOn(window, 'alert');
        render(<App />);
        expect(screen.getByText('🛒 Carrito (0)')).toBeTruthy();

        fireEvent.click(screen.getAllByText('Agregar al carrito')[0]);

        expect(screen.getByText('🛒 Carrito (1)')).toBeTruthy();
        expect(window.alert).toHaveBeenCalledWith('¡Arena para gatos fue agregado al carrito!');
    });
});