<?php
include 'includes/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    $sql = "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssd", $nombre, $descripcion, $precio);

    if ($stmt->execute()) {
        echo "Producto agregado exitosamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<a href="admin.php">Volver</a>
