// Manejar el evento de confirmar pago
document.getElementById('confirmar-pago').addEventListener('click', function() {
    // Validar datos del formulario
    const nombre = document.getElementById('nombre').value;
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value;

    if (nombre && numeroTarjeta && fechaExpiracion && cvv) {
        // Llamar a la función para actualizar el stock y realizar la compra
        comprarCarrito();
    } else {
        alert('Por favor, complete todos los campos del formulario de pago.');
    }
});

// Función para realizar la compra y actualizar el stock
function comprarCarrito() {
    // Obtener el carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Enviar el carrito al servidor para verificar y actualizar stock
    fetch('verificar_y_actualizar_stock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrito)
    })
    .then(response => response.json())
    .then(data => {
        // Procesar la respuesta del servidor
        if (data.every(item => item.status === 'Stock actualizado')) {
            alert('Pago realizado con éxito');
            localStorage.removeItem('carrito'); // Limpiar el carrito
            window.location.href = 'confirmacion.html'; // Redirigir a la página de confirmación
        } else {
            alert('Error en la compra: ' + data.map(item => `${item.nombre}: ${item.status}`).join(', '));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al procesar el pago.');
    });
}
