<?php
include 'includes/db.php';
include 'templates/header.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);
    $rol = $_POST['rol'];

    $sql = "INSERT INTO usuarios (nombre, apellidos, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $apellidos, $correo, $contrasena, $rol);

    if ($stmt->execute()) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar el usuario.";
    }
}
?>

<h2>Registrar Usuario</h2>
<form action="register.php" method="POST">
    Nombre: <input type="text" name="nombre" required><br>
    Apellidos: <input type="text" name="apellidos" required><br>
    Correo electrónico: <input type="email" name="correo" required><br>
    Contraseña: <input type="password" name="contrasena" required><br>
    Rol:
    <select name="rol" required>
        <option value="administrador">Administrador</option>
        <option value="cliente">Cliente</option>
    </select><br>
    <input type="submit" value="Registrar">
</form>

<?php include 'templates/footer.php'; ?>
