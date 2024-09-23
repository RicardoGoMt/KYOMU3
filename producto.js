
const productos = {
    'producto1': {
        nombre: 'Carpeta de archivo - Van Gogh',
        descripcion: 'Carpeta de archivo',
        precio: '10.00',
        imagenes: ['img/producto1.png', 'img/producto1_1.png', 'img/producto1_2.png', 'img/producto1_3.png']
    },
    'producto2': {
        nombre: 'Post-it Paisaje',
        descripcion: 'Post-it',
        precio: '10.00',
        imagenes: ['img/producto2.png', 'img/producto2_1.png', 'img/producto2_2.png']
    },
    'producto3': {
        nombre: 'Washi Tape Vintage',
        descripcion: 'Washi Tape',
        precio: '10.00',
        imagenes: ['img/producto3.png', 'img/producto3_1.png']
    },
    'producto4': {
        nombre: 'Bouquet de papelería bonita',
        descripcion: 'Bouquet',
        precio: '10.00',
        imagenes: ['img/producto4.png', 'img/producto4_1.png']
    },
    'producto5': {
        nombre: 'Washi-tape con detalles en foil plateado',
        descripcion: 'Washi-tape',
        precio: '10.00',
        imagenes: ['img/producto5.png', 'img/producto5_1.png', 'img/producto5_2.png', 'img/producto5_3.png']
    },

};


let imagenIndex = 0;


const params = new URLSearchParams(window.location.search);
const productoId = params.get('id');


if (productos[productoId]) {
    const producto = productos[productoId];
    document.getElementById('nombre-producto').textContent = producto.nombre;
    document.getElementById('nombre-producto-detalle').textContent = producto.nombre;
    document.getElementById('descripcion-producto').textContent = producto.descripcion;
    document.getElementById('precio-producto').textContent = `Precio: $${producto.precio}`;
    document.getElementById('imagen-producto').src = producto.imagenes[imagenIndex];

   
    document.getElementById('btn-prev').addEventListener('click', () => {
        imagenIndex = (imagenIndex - 1 + producto.imagenes.length) % producto.imagenes.length;
        document.getElementById('imagen-producto').src = producto.imagenes[imagenIndex];
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        imagenIndex = (imagenIndex + 1) % producto.imagenes.length;
        document.getElementById('imagen-producto').src = producto.imagenes[imagenIndex];
    });
} else {

    document.getElementById('producto-detalle').innerHTML = '<p>Producto no encontrado.</p>';
}

// Obtener el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el carrito en localStorage
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    // Crear el producto seleccionado
    const productoSeleccionado = {
        id: productoId,
        nombre: productos[productoId].nombre,
        precio: productos[productoId].precio,
        cantidad: cantidad
    };
    
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === productoId);
    if (productoEnCarrito) {
        // Si ya está, actualizar la cantidad
        productoEnCarrito.cantidad += cantidad;
    } else {
        // Si no está, agregarlo al carrito
        carrito.push(productoSeleccionado);
    }
    
    // Actualizar el carrito en localStorage
    actualizarCarrito();
    
    alert('Has agregado ' + cantidad + ' unidades al carrito.');
}

// Mostrar el total de productos en el carrito
function mostrarTotalCarrito() {
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('total-carrito').textContent = `Carrito: ${totalProductos} productos`;
}

// Llamar a la función para mostrar el total del carrito al cargar la página
mostrarTotalCarrito();
