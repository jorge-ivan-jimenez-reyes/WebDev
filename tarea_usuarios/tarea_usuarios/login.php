<?php
session_start();
include 'includes/db.php'; // Conexión a la base de datos
include 'templates/header.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Verificar si el correo existe
    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        if (password_verify($contrasena, $usuario['contrasena'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['rol'] = $usuario['rol'];
            
            // Redirigir según el rol
            if ($usuario['rol'] == 'administrador') {
                header("Location: admin.php");
            } else {
                header("Location: cliente.php");
            }
            exit();
        } else {
            $error = "Contraseña incorrecta.";
        }
    } else {
        $error = "El correo no está registrado.";
    }
}
?>

<h2>Iniciar Sesión</h2>
<form action="login.php" method="POST">
    Correo electrónico: <input type="email" name="correo" required><br>
    Contraseña: <input type="password" name="contrasena" required><br>
    <input type="submit" value="Iniciar Sesión">
</form>

<?php include 'templates/footer.php'; ?>
