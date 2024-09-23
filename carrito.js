// Obtener el carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar productos en el carrito
function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = ''; // Limpiar contenido

    let totalPrecio = 0;

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            // Calcular el total del producto
            const totalProducto = producto.precio * producto.cantidad;

            const productoElement = document.createElement('div');
            productoElement.className = 'carrito-item'; // Usar clase para aplicar estilos
            productoElement.innerHTML = `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Total: $${totalProducto.toFixed(2)} - Precio unitario: $${producto.precio}</p>
            `;
            carritoContenido.appendChild(productoElement);

            // Acumular el precio total
            totalPrecio += totalProducto;
        });
    } else {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
    }

    // Mostrar el total general
    document.getElementById('total-precio').textContent = `Total: $${totalPrecio.toFixed(2)}`;
    // Actualizar total de productos en el carrito
    document.getElementById('total-carrito').textContent = `Carrito: ${carrito.reduce((total, item) => total + item.cantidad, 0)} productos`;
}

// Llamar a la función para mostrar el carrito al cargar la página
mostrarCarrito();

