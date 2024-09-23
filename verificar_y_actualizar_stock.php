<?php
// verificar_y_actualizar_stock.php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "papeleria_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]));
}

// Obtener datos del carrito desde el frontend
$productosCarrito = json_decode(file_get_contents('php://input'), true);
$respuesta = [];

// Verificar stock y actualizar
foreach ($productosCarrito as $producto) {
    $nombreProducto = $producto['nombre'];
    $cantidad = $producto['cantidad'];

    // Consulta para verificar stock
    $sql = "SELECT stock FROM productos WHERE nombre = '$nombreProducto'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stockActual = $row['stock'];

        if ($stockActual >= $cantidad) {
            // Descontar stock
            $nuevoStock = $stockActual - $cantidad;
            $sqlUpdate = "UPDATE productos SET stock = $nuevoStock WHERE nombre = '$nombreProducto'";
            if ($conn->query($sqlUpdate) === TRUE) {
                $respuesta[] = ['nombre' => $nombreProducto, 'status' => 'Stock actualizado'];
            } else {
                $respuesta[] = ['nombre' => $nombreProducto, 'status' => 'Error al actualizar stock'];
            }
        } else {
            $respuesta[] = ['nombre' => $nombreProducto, 'status' => 'Stock insuficiente'];
        }
    } else {
        $respuesta[] = ['nombre' => $nombreProducto, 'status' => 'Producto no encontrado'];
    }
}

$conn->close();
echo json_encode($respuesta);
?>
