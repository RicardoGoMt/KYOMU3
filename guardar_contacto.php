<?php
// Habilitar la visualización de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Datos de conexión a la base de datos
$host = "localhost";
$dbname = "contactos_db";
$username = "root";
$password = "";

// Crear la conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se recibieron los datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Obtener y limpiar los datos del formulario
    $nombre = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
    $apellido_paterno = isset($_POST['apellidopaterno']) ? $conn->real_escape_string($_POST['apellidopaterno']) : '';
    $apellido_materno = isset($_POST['apellidomaterno']) ? $conn->real_escape_string($_POST['apellidomaterno']) : '';
    $profesion = isset($_POST['profession']) ? $conn->real_escape_string($_POST['profession']) : '';
    $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
    $telefono = isset($_POST['telefono']) ? $conn->real_escape_string($_POST['telefono']) : '';
    $comentarios = isset($_POST['comentarios']) ? $conn->real_escape_string($_POST['comentarios']) : '';

    // Insertar datos en la base de datos
    $sql = "INSERT INTO contactos (nombre, apellido_paterno, apellido_materno, profesion, email, telefono, comentarios)
            VALUES ('$nombre', '$apellido_paterno', '$apellido_materno', '$profesion', '$email', '$telefono', '$comentarios')";

    if ($conn->query($sql) === TRUE) {
        // Redirigir a la página de confirmación
        header("Location: ruta.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "No se han recibido datos.";
}

// Cerrar la conexión
$conn->close();
?>
