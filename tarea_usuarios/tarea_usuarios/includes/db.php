<?php
// Conexión a la base de datos
$host = "localhost";      // Servidor
$user = "root";           // Usuario MySQL (en XAMPP, suele ser 'root' sin contraseña)
$password = "12345";      // Contraseña de MySQL, asegúrate de usar la correcta
$dbname = "tarea_usuarios"; // Nombre de tu base de datos
$port = 3307;             // Puerto de MySQL (asegúrate de que MySQL esté corriendo en este puerto)

// Crear la conexión
$conn = new mysqli($host, $user, $password, $dbname, $port);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
